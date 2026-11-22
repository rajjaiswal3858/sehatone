// Print the most recent inquiries:  npm run leads [-- 50]
// Uses DATABASE_URL / DATABASE_AUTH_TOKEN if set, otherwise the local SQLite file.
import { createClient } from "@libsql/client";

const limit = Number(process.argv[2]) || 20;
const db = createClient({
  url: process.env.DATABASE_URL || "file:./data/sehatone.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});
const { rows } = await db.execute({
  sql: `SELECT created_at, full_name, country_code || ' ' || phone AS mobile, email, organization,
               facility_type, notify_status AS team_email, confirm_status AS customer_email
        FROM inquiries ORDER BY created_at DESC LIMIT ?`,
  args: [limit],
});
console.table(rows.map((r) => ({ ...r })));
