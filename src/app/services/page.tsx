import type { Metadata } from "next";
import { FixedMarketingPane } from "@/components/layout/fixed-marketing-pane";
import { absoluteUrl, site } from "@/lib/site";

const title = "Services";
const description =
  "Websites, Google Business Profile optimization, local SEO, lead generation, and branding—scoped as focused engagements so you ship value quickly.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/services") },
  openGraph: {
    url: absoluteUrl("/services"),
    title: `${title} | ${site.name}`,
    description,
  },
  twitter: {
    title: `${title} | ${site.name}`,
    description,
  },
};

export default function ServicesPage() {
  return <FixedMarketingPane title={title} description={description} />;
}
