import type { Metadata } from "next";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: site.seoTitle,
  description: site.seoDescription,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    url: absoluteUrl("/"),
    title: site.seoTitle,
    description: site.seoDescription,
  },
  twitter: {
    title: site.seoTitle,
    description: site.seoDescription,
  },
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 pb-8 pt-28 sm:pt-32">
      <h1 className="sr-only">
        {site.name} — websites, local SEO, Google Business optimization, and online branding for local businesses
      </h1>
    </main>
  );
}
