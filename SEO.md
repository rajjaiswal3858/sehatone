# SEHATONE — SEO guide

What's implemented, the keyword plan, and the steps that need your accounts.

No one can guarantee rankings. This setup gives Google accurate, crawlable, fast pages that match
real search intent. Ranking then depends on time, competition and the authority you build.

---

## 1. Keyword plan (India)

The keywords below are grouped by **search intent**. I did not have access to a keyword tool, so
search volumes are **not** stated. Check them in **Google Keyword Planner** (free with a Google
Ads account) or Search Console once data comes in, then adjust page titles if a variation clearly
gets more searches.

| Page | Primary keyword | Secondary / related | Intent |
|---|---|---|---|
| `/` Home | clinic and hospital management software | healthcare management system, patient management software, hospital management system India, OPD management software | Commercial (comparing solutions) |
| `/clinic-management-software` | clinic management software | clinic software for doctors, clinic management system India, patient registration software, receptionist software for clinic | Commercial |
| `/hospital-management-software` | hospital management software | hospital management system, OPD management system, multi-specialty hospital software, hospital queue management | Commercial |
| `/patient-queue-management-system` | patient queue management system | token display system for hospital, token system for clinic, OPD token system, queue display screen | Commercial / product-specific |

Each page targets **one** primary intent, so the pages don't compete with each other for the same query.
Keywords appear naturally in the title, H1, intro, headings, FAQ and anchor text, with no stuffing.

**Honest positioning:** in India, "hospital management software" often implies billing, pharmacy,
labs and inpatient (IPD) modules. The hospital page says plainly that SEHATONE focuses on **OPD and
front-desk operations**. This avoids attracting visitors the product can't serve, which would raise
bounce rates and hurt trust.

### Future content (highest SEO value next)
Write these only when you can add real expertise. Thin articles hurt more than they help.
- "How to reduce patient waiting time in an OPD" (guide)
- "Token system vs appointment system for clinics" (comparison)
- "How to set up a waiting-room display screen" (how-to)
- Case studies, **only with real customers' written permission**

---

## 2. What's implemented ✅

### On-page
- [x] Unique `<title>` (48–59 chars, keyword first, brand last) and meta description (≤160 chars) on every page
- [x] Exactly one H1 per page and a heading outline with no skipped levels (verified automatically on all pages)
- [x] Descriptive URLs (`/clinic-management-software`, `/hospital-management-software`, `/patient-queue-management-system`)
- [x] Original, intent-specific copy on each landing page: problems, modules, who it's for, FAQ, CTA
- [x] Internal linking: header nav, footer "Solutions", hero "Built for" links, Who-we-serve "learn more" links, in-text links between related pages, and a "Related solutions" block on each landing page
- [x] Visible breadcrumbs on the landing pages and privacy page
- [x] Images: no raster photos; diagrams carry `role="img"` and descriptive `aria-label`s. Fake sample data in the mockups is marked `data-nosnippet`, so Google won't quote patient names in search results

### Technical
- [x] Canonical URL on every page (absolute, using `NEXT_PUBLIC_SITE_URL`)
- [x] `sitemap.xml` (5 URLs with last-modified dates) and `robots.txt` (blocks `/api/`, points to the sitemap)
- [x] **Indexing controls:** only the production deployment can be indexed. Vercel preview deploys get `noindex` and a `Disallow: /` robots.txt, and the 404 page is `noindex`
- [x] Correct status codes: real 404s, and the API is excluded from crawling
- [x] Semantic HTML: `header`, `nav`, `main`, `section` with `aria-labelledby`, `article`, `footer`, `dl`, `details`/`summary`
- [x] `lang="en-IN"`, Open Graph and Twitter cards with a 1200×630 share image on every page, web app manifest, favicon, Apple touch icon, theme colour
- [x] HTTPS, with HSTS and security headers (HTTPS is automatic on Vercel)
- [x] Mobile-first responsive layout, verified with no horizontal overflow at 390px, 768px, 1100px and 1440px

### Structured data (JSON-LD, accurate facts only)
- [x] `Organization` (name, URL, logo, email, contact point; a phone number is added only if you set one)
- [x] `WebSite`
- [x] `SoftwareApplication` (category, feature list taken from the real capabilities, audience). **No** ratings, reviews or prices are included, because inventing them would breach Google's guidelines
- [x] `WebPage` on each page, `BreadcrumbList` on sub-pages, `FAQPage` matching the visible FAQs
- Note: Google currently shows FAQ rich results mainly for government and health authority sites, so don't expect FAQ dropdowns in search. The markup is still valid and helps machine understanding.
- No `LocalBusiness` schema, because no business address was provided. Add it only when you have a real, verifiable address.

### Performance (Core Web Vitals)
- [x] Every page is static HTML generated at build time: 7–15 ms server response locally, 6–25 KB compressed HTML
- [x] About 106–113 KB JavaScript on first load, mostly the shared React/Next runtime
- [x] No raster images to optimise; all visuals are lightweight inline SVG/HTML
- [x] Self-hosted fonts via `next/font` with `display: swap`, so text is never invisible while fonts load. One font weight was removed and the mono font isn't preloaded
- [x] Analytics loads after the page is interactive and never blocks rendering
- [x] Reduced-motion support; animations use only transform and opacity
- [ ] **Verify after deploy:** run PageSpeed Insights (pagespeed.web.dev) on the live URL. Locally, Next.js didn't emit font preload hints (it appears to be a quirk of Windows builds). Check that the live HTML contains `<link rel="preload" as="font">`; if it doesn't, tell me and I'll investigate.

### Analytics & conversion tracking (ready, activates when you add the ID)
| GA4 event | When it fires |
|---|---|
| `generate_lead` | Demo form submitted successfully (not for duplicates). **Mark this as a Key Event** |
| `form_error` | Form submission rejected |
| `demo_cta_click` | Any "Book a demo" button clicked |
| `contact_click` | Phone or email link clicked (`method: phone/email`) |

No personal data (name, phone, email) is ever sent to Google Analytics.

---

## 3. Your action items ⚠️

1. **Deploy on the final domain** and set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`. Pick one
   version (with or without `www`) and redirect the other to it in Vercel → Domains.
2. **Google Search Console** (search.google.com/search-console)
   - Add a **Domain property** and verify with the DNS TXT record (recommended; it covers http/https and www).
     Alternatively use a URL-prefix property with the HTML tag: put the code in `NEXT_PUBLIC_GSC_VERIFICATION` and redeploy.
   - Sitemaps → submit `https://yourdomain.com/sitemap.xml`.
   - URL Inspection → "Request indexing" for the home page and the three solution pages.
   - Check **Pages**, **Core Web Vitals** and **Enhancements** (breadcrumbs) after 1–2 weeks.
3. **Google Analytics 4** (analytics.google.com)
   - Create a property and a Web data stream for your domain, and copy the Measurement ID (`G-…`) into `NEXT_PUBLIC_GA_ID`. Redeploy.
   - Admin → Events → mark `generate_lead` as a **Key Event** (conversion).
   - Admin → Product links → **link Search Console**.
   - Set data retention to 14 months.
4. **Bing Webmaster Tools:** import your site from Search Console in one click; this also covers some AI search engines.
5. **Google Business Profile:** create one **only if** you have a real office address or service area.
   Never use a virtual or fake address.
6. **Off-page:** list SEHATONE honestly on Indian SaaS and healthcare software directories, and get
   mentions from real customers and partners. Never buy links.
7. **Consent:** the privacy policy now discloses Google Analytics. If you plan to target EU visitors,
   add a consent banner. Have the policy reviewed against India's DPDP Act.
8. **Keep it fresh:** when page content changes meaningfully, update its date in `app/sitemap.ts`.

---

## 4. Re-running the audit

Every page was checked automatically for: HTTP 200, title/description length, duplicate
titles/descriptions, a single H1, heading-order skips, canonical, robots meta, Open Graph tags,
JSON-LD validity, images without alt text, broken internal links and anchors, sitemap/robots/icons,
and the 404 status with noindex. **Result: 0 issues.**

After deploying, also run:
- Rich Results Test: search.google.com/test/rich-results
- Schema validator: validator.schema.org
- PageSpeed Insights: pagespeed.web.dev (mobile)
