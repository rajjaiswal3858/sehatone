import { createClient, type Client } from "@libsql/client";
import { mkdirSync } from "node:fs";

let client: Client | null = null;
let schemaReady: Promise<void> | null = null;

function getUrl() {
  // TURSO_* are the names the Vercel Marketplace integration creates
  const url = process.env.DATABASE_URL || process.env.TURSO_DATABASE_URL;
  if (url) return url;
  if (process.env.NODE_ENV === "production" && !process.env.ALLOW_FILE_DB) {
    throw new Error("DATABASE_URL is not configured. Leads cannot be stored.");
  }
  mkdirSync("./data", { recursive: true });
  return "file:./data/sehatone.db";
}

export function db(): Client {
  if (!client) {
    client = createClient({ url: getUrl(), authToken: process.env.DATABASE_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN });
  }
  return client;
}

async function migrate() {
  await db().batch(
    [
      `CREATE TABLE IF NOT EXISTS inquiries (
        id              TEXT PRIMARY KEY,
        created_at      TEXT NOT NULL,
        full_name       TEXT NOT NULL,
        country_code    TEXT NOT NULL,
        phone           TEXT NOT NULL,
        email           TEXT NOT NULL,
        organization    TEXT,
        facility_type   TEXT,
        message         TEXT,
        submission_key  TEXT NOT NULL UNIQUE,
        ip_hash         TEXT,
        user_agent      TEXT,
        status          TEXT NOT NULL DEFAULT 'new',
        notify_status   TEXT NOT NULL DEFAULT 'pending',
        confirm_status  TEXT NOT NULL DEFAULT 'pending'
      )`,
      `CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries (created_at)`,
      `CREATE INDEX IF NOT EXISTS idx_inquiries_ip ON inquiries (ip_hash, created_at)`,
      `CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries (email, created_at)`,
    ],
    "write",
  );
}

export function ensureSchema() {
  if (!schemaReady) {
    schemaReady = migrate().catch((err) => {
      schemaReady = null; // retry on the next request
      throw err;
    });
  }
  return schemaReady;
}
