import type { Metadata } from "next";
import { site } from "./site";

interface PageSeo {
  title: string; // full <title>, 50–60 chars, keyword first, brand last
  description: string; // 140–160 chars
  path: string; // "/" or "/clinic-management-software"
}

const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "SEHATONE — clinic and hospital management software",
};

/** Unique title, description, canonical, Open Graph and Twitter tags for one page. */
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url: path,
      title,
      description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  };
}

export const abs = (path: string) => `${site.url}${path === "/" ? "" : path}`;

type Crumb = { name: string; path: string };

export function breadcrumbLd(trail: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function webPageLd({ title, description, path }: PageSeo) {
  return {
    "@type": "WebPage",
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name: title,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#software` },
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Renders one JSON-LD <script> containing a @graph of the given nodes. */
export function JsonLd({ nodes }: { nodes: object[] }) {
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
