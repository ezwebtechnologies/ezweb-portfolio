import type { Metadata } from "next";
import { ContactShowcase } from "@/components/contact-showcase";
import { absoluteUrl, site } from "@/lib/site";

const title = "Contact";
const description =
  "Contact EZWeb for websites, Google Business Profile, local SEO, and lead generation. Send your goals and we will reply with clear next steps.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/contact") },
  keywords: [
    ...site.keywords,
    "contact EZWeb",
    "EZWeb India",
    "local business web design contact",
  ],
  openGraph: {
    url: absoluteUrl("/contact"),
    title: `${title} | ${site.name}`,
    description,
    type: "website",
  },
  twitter: {
    title: `${title} | ${site.name}`,
    description,
  },
};

export default function ContactPage() {
  return <ContactShowcase />;
}
