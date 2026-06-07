import type { MetadataRoute } from "next";
import { site, siteSitemapRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = site.url.replace(/\/$/, "");
  const now = new Date();

  return siteSitemapRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${origin}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
