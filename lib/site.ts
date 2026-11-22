// Canonical site URL. Set NEXT_PUBLIC_SITE_URL in production; Vercel's production
// domain is used as a fallback so canonicals never point at localhost in a deploy.
const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  "http://localhost:3000";

export const site = {
  name: "SEHATONE",
  tagline: "Smart Healthcare Management System",
  description:
    "SEHATONE is clinic and hospital management software for patient registration, reception and doctor dashboards, token queues, live display screens and operational reports.",
  url: rawUrl.replace(/\/$/, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "business@sehatone.co.in",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  locale: "en_IN",
};

/** Only the real production deployment may be indexed (keeps previews/staging out of Google). */
export const isIndexable =
  process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : process.env.NODE_ENV === "production";

export const solutions = [
  {
    href: "/clinic-management-software",
    label: "Clinic management software",
    short: "Clinics",
  },
  {
    href: "/hospital-management-software",
    label: "Hospital management software",
    short: "Hospitals",
  },
  {
    href: "/patient-queue-management-system",
    label: "Patient queue & token display system",
    short: "Queue & displays",
  },
];

export const nav = [
  { href: "/#product", label: "Product" },
  { href: "/clinic-management-software", label: "Clinics" },
  { href: "/hospital-management-software", label: "Hospitals" },
  { href: "/patient-queue-management-system", label: "Queue & displays" },
  { href: "/#how-it-works", label: "How it works" },
];
