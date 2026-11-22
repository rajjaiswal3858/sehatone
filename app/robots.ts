import type { MetadataRoute } from "next";
import { site, isIndexable } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Preview / staging deployments are fully blocked so they never compete with production.
  if (!isIndexable) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
