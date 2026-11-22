import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Update a page's date here when its content meaningfully changes.
const pages: { path: string; lastModified: string; priority: number }[] = [
  { path: "/", lastModified: "2026-11-17", priority: 1 },
  { path: "/clinic-management-software", lastModified: "2026-11-17", priority: 0.9 },
  { path: "/hospital-management-software", lastModified: "2026-11-17", priority: 0.9 },
  { path: "/patient-queue-management-system", lastModified: "2026-11-17", priority: 0.8 },
  { path: "/privacy", lastModified: "2026-11-17", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({
    url: `${site.url}${p.path === "/" ? "" : p.path}`,
    lastModified: p.lastModified,
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
