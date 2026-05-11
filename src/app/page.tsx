import type { Metadata } from "next";
import { ServicesShowcase } from "@/components/services-showcase";
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
    <main className="flex flex-1 flex-col">
      <ServicesShowcase />
    </main>
  );
}
