# SEHATONE — Website

Marketing site and lead capture for **SEHATONE – Smart Healthcare Management System** (clinics & hospitals).

**Stack:** Next.js 15 (App Router, TypeScript) · plain CSS design system (no UI framework) · libSQL/SQLite (Turso in production) · Resend for email. Only two runtime dependencies besides React/Next: `@libsql/client`. No images to optimise: every product visual is a code-built mockup (HTML/SVG), so pages are tiny (~112 kB first load).

```
app/
  layout.tsx            fonts, SEO metadata, JSON-LD
  page.tsx              home page (section order, FAQ)
  clinic-management-software/, hospital-management-software/,
  patient-queue-management-system/   SEO landing pages (components/Landing.tsx)
  privacy/page.tsx      privacy policy
  api/inquiry/route.ts  form endpoint: validation, spam/duplicate protection, DB, emails
  opengraph-image.tsx   social share image · sitemap.ts · robots.ts · icon.svg
components/
  Sections.tsx          Hero, Problems, Solution, Audience, Journey, Why, Footer
  Features.tsx          accessible tabbed product modules
  Contact.tsx + InquiryForm.tsx
  mockups/              reception, doctor, registration, queue, display screen, reports
lib/
  validation.ts         shared rules — the SAME code validates in the browser and on the server
  db.ts · email.ts · site.ts
scripts/leads.mjs       print recent leads in the terminal
```

---

## 1. Run locally

Requires Node 18.18+ (tested on Node 20).

```bash
npm install
cp .env.example .env.local     # then edit values
npm run dev                    # http://localhost:3000
```

- With no `DATABASE_URL`, leads are stored in `./data/sehatone.db` (SQLite, created automatically).
- With no `RESEND_API_KEY`, emails are **skipped** and printed to the terminal instead. The lead is still saved.
- `npm run leads` shows the latest inquiries (`npm run leads -- 50` for more).
- `npm run build && npm start` runs the production build. Locally, add `ALLOW_FILE_DB=1` to keep using the SQLite file.

## 2. How the form protects you

| Protection | How |
|---|---|
| Validation | `lib/validation.ts` runs in the browser (inline errors) **and** in the API (authoritative). Indian numbers must be 10 digits starting 6–9. |
| Spam | Hidden honeypot field + minimum 3 s fill time (bots get a fake "success") + max 2 links per message + same-origin check + 10 KB body limit. |
| Rate limit | 5 submissions per IP per hour. IPs are stored only as salted SHA-256 hashes. |
| Duplicates | Each form fill has a unique key (double-clicks/retries are idempotent), and the same email/phone + message within 30 min is not stored twice. The button is disabled while sending. |
| Reliability | The lead is written to the DB **before** emails are sent; an email failure never loses a lead. Delivery status for both emails is recorded per lead (`sent` / `skipped` / `failed`). |
| Secrets | API keys are server-only env vars (never `NEXT_PUBLIC_`). |

The team email includes all fields, one-tap **Call** and **WhatsApp** buttons for the customer's mobile number, and *Reply-To* set to the customer. The customer gets a branded confirmation whose replies go to your business inbox.

## 3. Production setup

### a) Database: Turso (free tier is plenty)
```bash
# install CLI: https://docs.turso.tech/cli/installation
turso auth signup
turso db create sehatone --location bom      # Mumbai region
turso db show sehatone --url                 # → DATABASE_URL
turso db tokens create sehatone              # → DATABASE_AUTH_TOKEN
```
The table is created automatically on the first submission. Browse leads in the Turso dashboard, or locally with `DATABASE_URL=... DATABASE_AUTH_TOKEN=... npm run leads`.

### b) Email: Resend
1. Create an account at resend.com → **Domains → Add domain** → `sehatone.co.in` (or the domain you pick).
2. Add the DNS records Resend shows (SPF/DKIM, usually 3 records) at your domain registrar. Wait for **Verified**.
3. **API Keys → Create** (permission: *Sending access*) → `RESEND_API_KEY`.
4. Set `EMAIL_FROM="SEHATONE <noreply@sehatone.co.in>"` and `BUSINESS_EMAIL=you@yourcompany.com` (comma-separate several).

> Until the domain is verified, Resend only lets you send *from* `onboarding@resend.dev` *to your own account email*. That's fine for a quick test, but customer confirmations need a verified domain.

### c) Deploy: Vercel
1. Push this folder to a GitHub repository.
2. vercel.com → **Add New → Project** → import the repo (framework auto-detected: Next.js).
3. **Settings → Environment Variables** (Production): `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`, `DATABASE_URL`, `DATABASE_AUTH_TOKEN`, `RESEND_API_KEY`, `EMAIL_FROM`, `BUSINESS_EMAIL`, `IP_HASH_SALT` (any long random string).
4. Deploy. Submit a real test inquiry and check both inboxes plus the Turso table.

### d) Connect the domain (HTTPS is automatic)
1. Vercel → Project → **Settings → Domains** → add `sehatone.co.in` and `www.sehatone.co.in` (set one to redirect to the other).
2. At your registrar's DNS panel:
   - `A` record, host `@` → `76.76.21.21`
   - `CNAME` record, host `www` → `cname.vercel-dns.com`
   (Use the exact values Vercel shows if they differ.)
3. Vercel issues and renews the SSL certificate automatically once DNS resolves (minutes to a few hours). HSTS and security headers are already set in `next.config.ts`.
4. Keep `www.sehatone.co.in` as the primary domain. If that changes, update `canonicalUrl` in `lib/site.ts` and the redirect in `next.config.ts`, then redeploy.

Keep the Resend DNS records alongside the Vercel ones; they don't conflict.

## 4. Before going live

- [ ] Set real contact email/phone (`NEXT_PUBLIC_CONTACT_*`).
- [ ] Review feature copy in `components/Features.tsx` and `components/Sections.tsx` against what the product actually ships today.
- [ ] Have the privacy policy (`app/privacy/page.tsx`) reviewed for your jurisdiction (e.g. India's DPDP Act).
- [ ] Optional: add Cloudflare Turnstile if spam ever gets past the honeypot + rate limit.
- [ ] Complete the SEO setup steps in [SEO.md](SEO.md) (Search Console, GA4, key events).
