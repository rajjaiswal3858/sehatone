import type { InquiryInput } from "./validation";
import { site } from "./site";

const DEFAULT_FROM = "SEHATONE <noreply@sehatone.co.in>";

// Resend's shared sender. It can deliver only to the Resend account owner's address.
const SHARED_FROM = "SEHATONE <onboarding@resend.dev>";

type SendResult = "sent" | "skipped" | "failed";
interface Outcome {
  status: SendResult;
  /** Fixed category, safe to show publicly: never contains provider text, addresses or keys. */
  reason?: string;
}

/** Values pasted into hosting dashboards often arrive wrapped in quotes or whitespace. */
const envValue = (v?: string) => (v ?? "").trim().replace(/^["']+|["']+$/g, "").trim();

function failureReason(status: number, body: string) {
  if (/only send testing emails/i.test(body)) return "recipient_not_account_owner";
  if (/domain is not verified/i.test(body)) return "sender_not_verified";
  if (/invalid .{0,3}from/i.test(body)) return "sender_invalid";
  if (/not authorized to send emails from/i.test(body)) return "key_restricted_to_domain";
  if (/api key is invalid/i.test(body) || status === 401) return "key_invalid";
  return `provider_${status}`;
}

interface Mail {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  idempotencyKey: string;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function send(mail: Mail, sender?: string): Promise<Outcome> {
  const key = envValue(process.env.RESEND_API_KEY);
  const from = sender || envValue(process.env.EMAIL_FROM) || DEFAULT_FROM;
  if (!key) {
    console.warn(`[email] RESEND_API_KEY not set — skipped "${mail.subject}" to ${mail.to.join(", ")}`);
    if (process.env.NODE_ENV !== "production") console.info(mail.text);
    return { status: "skipped", reason: "key_missing" };
  }
  // Checked up front: fetch quotes a malformed header, and so the key, in its error message.
  if (!/^[\w-]+$/.test(key)) {
    console.error("[email] RESEND_API_KEY contains invalid characters");
    return { status: "failed", reason: "key_malformed" };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "User-Agent": "contact-form/1.0", // Resend rejects requests without one
        "Idempotency-Key": mail.idempotencyKey,
      },
      body: JSON.stringify({
        from,
        to: mail.to,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
        reply_to: mail.replyTo,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`[email] Resend error ${res.status}: ${body}`);
      return { status: "failed", reason: failureReason(res.status, body) };
    }
    return { status: "sent" };
  } catch (err) {
    console.error("[email] Network error", err);
    return { status: "failed", reason: "network_error" };
  }
}

/** The team alert matters most, so retry it from the shared sender if ours is rejected. */
async function sendToTeam(mail: Mail): Promise<Outcome> {
  const first = await send(mail);
  if (first.reason !== "sender_not_verified" && first.reason !== "sender_invalid") return first;
  return send({ ...mail, idempotencyKey: `${mail.idempotencyKey}-shared` }, SHARED_FROM);
}

function layout(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#F5F3EE;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#0D1B2A">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #DCD7CC;border-radius:6px">
<tr><td style="padding:22px 28px;border-bottom:3px solid #0F8B80;background:#0F2A44;color:#ffffff;border-radius:6px 6px 0 0">
<span style="font-size:17px;font-weight:700;letter-spacing:.06em">SEHAT<span style="color:#5FD1C2">ONE</span></span>
<div style="font-size:12px;color:#A9BCCF;margin-top:4px">${esc(title)}</div></td></tr>
<tr><td style="padding:28px">${body}</td></tr>
<tr><td style="padding:16px 28px;border-top:1px solid #E8E4DB;font-size:12px;color:#57636F">${esc(site.name)} · ${esc(site.tagline)}</td></tr>
</table></body></html>`;
}

const row = (label: string, value: string) =>
  `<tr><td style="padding:9px 0;border-bottom:1px solid #EEE;color:#57636F;font-size:13px;width:150px;vertical-align:top">${esc(label)}</td>
<td style="padding:9px 0;border-bottom:1px solid #EEE;font-size:14px;vertical-align:top">${value}</td></tr>`;

export async function sendInquiryEmails(d: InquiryInput, id: string, createdAt: Date, { confirmCustomer = true } = {}) {
  const fullPhone = `${d.countryCode}${d.phone}`;
  const waNumber = fullPhone.replace(/\D/g, "");
  const when = createdAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
  const business = (process.env.BUSINESS_EMAIL || site.email).split(",").map((s) => s.trim()).filter(Boolean);

  const fields: [string, string][] = [
    ["Name", d.fullName],
    ["Mobile", `${d.countryCode} ${d.phone}`],
    ["Email", d.email],
    ["Clinic / Hospital", d.organization || "—"],
    ["Facility type", d.facilityType || "—"],
    ["Message", d.message || "—"],
    ["Received", `${when} IST`],
    ["Reference", id],
  ];

  const teamHtml = layout(
    "New demo / inquiry request",
    `<p style="margin:0 0 6px;font-size:20px;font-weight:700">${esc(d.fullName)}</p>
<p style="margin:0 0 20px;font-size:14px;color:#57636F">${esc(d.organization || "Organization not provided")}${d.facilityType ? ` · ${esc(d.facilityType)}` : ""}</p>
<p style="margin:0 0 24px">
<a href="tel:${esc(fullPhone)}" style="display:inline-block;background:#0F8B80;color:#fff;text-decoration:none;padding:10px 16px;border-radius:4px;font-size:14px;font-weight:700;margin-right:8px">Call ${esc(d.countryCode)} ${esc(d.phone)}</a>
<a href="https://wa.me/${waNumber}" style="display:inline-block;border:1px solid #0F8B80;color:#0F8B80;text-decoration:none;padding:9px 16px;border-radius:4px;font-size:14px;font-weight:700">WhatsApp</a></p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${fields.map(([l, v]) => row(l, l === "Email" ? `<a href="mailto:${esc(v)}" style="color:#0F8B80">${esc(v)}</a>` : esc(v).replace(/\n/g, "<br>"))).join("")}
</table>`,
  );
  const teamText = `New SEHATONE inquiry\n\n${fields.map(([l, v]) => `${l}: ${v}`).join("\n")}\n\nCall: ${fullPhone}\nWhatsApp: https://wa.me/${waNumber}`;

  const firstName = d.fullName.split(" ")[0];
  const customerHtml = layout(
    "We have received your request",
    `<p style="margin:0 0 16px;font-size:16px">Hello ${esc(firstName)},</p>
<p style="margin:0 0 16px;font-size:15px;line-height:1.6">Thank you for your interest in SEHATONE. Your ${d.facilityType ? `request for your ${esc(d.facilityType.toLowerCase())}` : "request"} has reached our team, and someone will contact you on <strong>${esc(d.countryCode)} ${esc(d.phone)}</strong> or at this email address to understand your requirements and arrange a demo.</p>
<p style="margin:0 0 16px;font-size:15px;line-height:1.6">If you would like to add anything in the meantime, simply reply to this email.</p>
<p style="margin:24px 0 0;font-size:15px">Regards,<br><strong>Team SEHATONE</strong></p>
<p style="margin:24px 0 0;font-size:12px;color:#57636F">Reference: ${esc(id)}</p>`,
  );
  const customerText = `Hello ${firstName},\n\nThank you for your interest in SEHATONE. Your request has reached our team, and someone will contact you on ${d.countryCode} ${d.phone} or at this email address to understand your requirements and arrange a demo.\n\nIf you would like to add anything in the meantime, simply reply to this email.\n\nRegards,\nTeam SEHATONE\n\nReference: ${id}`;

  const [team, customer] = await Promise.all([
    business.length
      ? sendToTeam({
          to: business,
          subject: `New demo request — ${d.fullName}${d.organization ? `, ${d.organization}` : ""}`,
          html: teamHtml,
          text: teamText,
          replyTo: d.email,
          idempotencyKey: `${id}-team`,
        })
      : (console.warn("[email] BUSINESS_EMAIL not set — team notification skipped"), Promise.resolve<Outcome>({ status: "skipped", reason: "recipient_missing" })),
    !confirmCustomer ? Promise.resolve<Outcome>({ status: "skipped" }) : send({
      to: [d.email],
      subject: "Thank you for contacting SEHATONE",
      html: customerHtml,
      text: customerText,
      replyTo: business[0],
      idempotencyKey: `${id}-customer`,
    }),
  ]);

  return { notify: team.status, confirm: customer.status, reason: team.reason };
}
