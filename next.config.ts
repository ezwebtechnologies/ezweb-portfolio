import type { NextConfig } from "next";

const longCache = "public, max-age=31536000, immutable";
const faviconCache = "public, max-age=86400, stale-while-revalidate=604800";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/og-image.png",
        headers: [{ key: "Cache-Control", value: longCache }],
      },
      {
        source: "/icon.png",
        headers: [{ key: "Cache-Control", value: longCache }],
      },
      {
        source: "/icon-192.png",
        headers: [{ key: "Cache-Control", value: longCache }],
      },
      {
        source: "/apple-touch-icon.png",
        headers: [{ key: "Cache-Control", value: longCache }],
      },
      {
        source: "/favicon.ico",
        headers: [{ key: "Cache-Control", value: faviconCache }],
      },
    ];
  },
};

export default nextConfig;
