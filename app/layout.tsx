import type { Metadata, Viewport } from "next";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { site, isIndexable } from "@/lib/site";
import { JsonLd } from "@/lib/seo";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const display = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});
const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
  preload: false, // used only for small labels; keep it off the critical path
});

// Site-wide defaults. Every page overrides title/description/canonical via pageMetadata().
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "SEHATONE — Clinic & Hospital Management Software", template: "%s | SEHATONE" },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  robots: isIndexable
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
    : { index: false, follow: false },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0F2A44",
  width: "device-width",
  initialScale: 1,
};

// Organization / WebSite / SoftwareApplication — facts only (no ratings, prices or addresses).
const siteGraph = [
  {
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: ["SehatOne", "Sehat One"],
    url: site.url,
    logo: { "@type": "ImageObject", url: `${site.url}/logo.png`, width: 512, height: 512 },
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      ...(site.phone ? { telephone: site.phone } : {}),
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  },
  {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: `${site.url}/`,
    name: site.name,
    alternateName: ["SehatOne", "Sehat One", "sehatone.co.in"],
    description: site.description,
    inLanguage: "en-IN",
    publisher: { "@id": `${site.url}/#organization` },
  },
  {
    "@type": "SoftwareApplication",
    "@id": `${site.url}/#software`,
    name: "SEHATONE",
    alternateName: "SEHATONE Smart Healthcare Management System",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Clinic and hospital management software",
    operatingSystem: "Web browser",
    description: site.description,
    url: site.url,
    publisher: { "@id": `${site.url}/#organization` },
    featureList: [
      "Digital patient registration and records",
      "Appointment and walk-in management",
      "Receptionist dashboard",
      "Doctor dashboard",
      "Patient token and queue management",
      "Live patient display screens",
      "Multiple screens connected to one central system",
      "Reports and operational analytics",
    ],
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Private clinics, hospitals and multi-specialty healthcare facilities",
    },
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        {/* Enables reveal-on-scroll styles only when JS is available (runs before content paints) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <JsonLd nodes={siteGraph} />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
