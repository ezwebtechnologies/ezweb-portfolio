import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = site.url.replace(/\/$/, "");
  const now = new Date();
  const paths = ["", "/contact"] as const;
  return paths.map((path) => ({
    url: `${origin}${path || "/"}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
