import { NextResponse } from "next/server";
import { createHash, randomUUID } from "node:crypto";
import { db, ensureSchema } from "@/lib/db";
import { validateInquiry, type InquiryInput } from "@/lib/validation";
import { sendInquiryEmails } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = 10_000; // bytes
const MIN_FILL_MS = 3_000; // humans don't complete the form in under 3s
const RATE_WINDOW_MIN = 60;
const RATE_MAX = 5; // per IP per window
const DUP_WINDOW_MIN = 30;

const json = (status: number, body: Record<string, unknown>) => NextResponse.json(body, { status });

function clientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

const minutesAgo = (m: number) => new Date(Date.now() - m * 60_000).toISOString();

// Best-effort, per-instance limit for when the database (and so the real rate limit) is down.
const fallbackHits = new Map<string, number[]>();

function fallbackLimited(ipHash: string) {
  const since = Date.now() - RATE_WINDOW_MIN * 60_000;
  const hits = (fallbackHits.get(ipHash) ?? []).filter((t) => t > since);
  if (hits.length >= RATE_MAX) return true;
  if (fallbackHits.size > 5_000) fallbackHits.clear();
  fallbackHits.set(ipHash, [...hits, Date.now()]);
  return false;
}

/**
 * The lead couldn't be stored, so email is the only copy: succeed only if the team got it.
 * No customer confirmation here, as without the database it could be abused to mail strangers.
 */
async function deliverWithoutDatabase(d: InquiryInput, ipHash: string) {
  if (fallbackLimited(ipHash)) {
    return json(429, { ok: false, message: "Too many requests. Please try again later or contact us directly." });
  }
  const { notify, reason } = await sendInquiryEmails(d, randomUUID(), new Date(), { confirmCustomer: false });
  if (notify !== "sent") {
    return json(503, { ok: false, code: reason, message: "We couldn't submit your request online right now." });
  }
  return json(201, {
    ok: true,
    message: "Thank you. Your request has been received — our team will contact you shortly.",
    confirmationSent: false,
  });
}

export async function POST(req: Request) {
  // Same-origin check (browsers always send Origin on cross-site POSTs)
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  let originHost = "";
  try {
    originHost = origin ? new URL(origin).host : "";
  } catch {
    /* "null" or malformed origin */
  }
  if (origin && host && originHost !== host) {
    return json(403, { ok: false, message: "Request blocked." });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY) return json(413, { ok: false, message: "Submission is too large." });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, message: "Invalid request." });
  }

  // Spam traps: honeypot field + minimum fill time. Respond as if successful so bots learn nothing.
  const startedAt = Number(body.startedAt);
  if (body.website || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return json(200, { ok: true, message: "Thank you. We'll be in touch shortly." });
  }

  const submissionKey = typeof body.submissionKey === "string" ? body.submissionKey.slice(0, 64) : "";
  if (!/^[\w-]{16,64}$/.test(submissionKey)) return json(400, { ok: false, message: "Invalid request." });

  const result = validateInquiry(body);
  if (!result.ok) {
    return json(422, { ok: false, message: "Please correct the highlighted fields.", errors: result.errors });
  }
  const d = result.data;

  const ipHash = createHash("sha256")
    .update(`${process.env.IP_HASH_SALT || "sehatone"}:${clientIp(req)}`)
    .digest("hex");

  try {
    await ensureSchema();
    const client = db();

    // 1. Idempotent retry of the same submission (double-click / network retry)
    const existing = await client.execute({
      sql: "SELECT id FROM inquiries WHERE submission_key = ?",
      args: [submissionKey],
    });
    if (existing.rows.length) {
      return json(200, { ok: true, duplicate: true, message: "We already have your request. Our team will contact you soon." });
    }

    // 2. Rate limit per (hashed) IP
    const recent = await client.execute({
      sql: "SELECT COUNT(*) AS n FROM inquiries WHERE ip_hash = ? AND created_at > ?",
      args: [ipHash, minutesAgo(RATE_WINDOW_MIN)],
    });
    if (Number(recent.rows[0]?.n ?? 0) >= RATE_MAX) {
      return json(429, { ok: false, message: "Too many requests. Please try again later or contact us directly." });
    }

    // 3. Same person re-sending the same request shortly after
    const dup = await client.execute({
      sql: `SELECT id FROM inquiries WHERE (email = ? OR (country_code = ? AND phone = ?))
            AND COALESCE(message,'') = ? AND created_at > ? LIMIT 1`,
      args: [d.email, d.countryCode, d.phone, d.message, minutesAgo(DUP_WINDOW_MIN)],
    });
    if (dup.rows.length) {
      return json(200, { ok: true, duplicate: true, message: "We already have your request. Our team will contact you soon." });
    }

    const id = randomUUID();
    const now = new Date();
    try {
      await client.execute({
        sql: `INSERT INTO inquiries
          (id, created_at, full_name, country_code, phone, email, organization, facility_type, message, submission_key, ip_hash, user_agent)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          id, now.toISOString(), d.fullName, d.countryCode, d.phone, d.email,
          d.organization || null, d.facilityType || null, d.message || null,
          submissionKey, ipHash, (req.headers.get("user-agent") || "").slice(0, 300),
        ],
      });
    } catch (err) {
      // Concurrent duplicate of the same submission key
      if (String(err).includes("UNIQUE")) {
        return json(200, { ok: true, duplicate: true, message: "We already have your request. Our team will contact you soon." });
      }
      throw err;
    }

    // Lead is safely stored — now notify. Email failure never loses the lead.
    const { notify, confirm } = await sendInquiryEmails(d, id, now);
    await client
      .execute({
        sql: "UPDATE inquiries SET notify_status = ?, confirm_status = ? WHERE id = ?",
        args: [notify, confirm, id],
      })
      .catch((e) => console.error("[inquiry] status update failed", e));

    return json(201, {
      ok: true,
      message: "Thank you. Your request has been received — our team will contact you shortly.",
      confirmationSent: confirm === "sent",
    });
  } catch (err) {
    console.error("[inquiry] database unavailable — falling back to email only", err);
    return deliverWithoutDatabase(d, ipHash);
  }
}

export function GET() {
  return json(405, { ok: false, message: "Method not allowed." });
}
