import type { Metadata } from "next";
import { WorkShowcase } from "@/components/work-showcase";
import { absoluteUrl, site } from "@/lib/site";

const title = "Work";
const description =
  "Websites, local SEO, Google Business Profile, and lead-focused builds for local businesses—delivered with speed, clarity, and measurable outcomes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/work") },
  openGraph: {
    url: absoluteUrl("/work"),
    title: `${title} | ${site.name}`,
    description,
  },
  twitter: {
    title: `${title} | ${site.name}`,
    description,
  },
};

export default function WorkPage() {
  return <WorkShowcase />;
}
