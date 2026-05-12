import type { MetadataRoute } from "next";
import {
  site,
  siteAppleTouchIconPath,
  siteIcon192Path,
  siteStructuredLogoPath,
} from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.seoDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#050508",
    theme_color: "#050508",
    icons: [
      {
        src: siteIcon192Path,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: siteStructuredLogoPath,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: siteAppleTouchIconPath,
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
