import type { Metadata } from "next";
import { FixedMarketingPane } from "@/components/layout/fixed-marketing-pane";
import { absoluteUrl, site } from "@/lib/site";

const title = "About";
const description =
  "EZWeb partners with local businesses to build a credible online presence—fast sites, clear messaging, and discovery that matches how customers actually search.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/about") },
  openGraph: {
    url: absoluteUrl("/about"),
    title: `${title} | ${site.name}`,
    description,
  },
  twitter: {
    title: `${title} | ${site.name}`,
    description,
  },
};

export default function AboutPage() {
  return <FixedMarketingPane title={title} description={description} />;
}
