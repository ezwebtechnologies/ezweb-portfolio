import { absoluteUrl, site, siteLogoPath } from "@/lib/site";

export function OrganizationJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.seoDescription,
    logo: absoluteUrl(siteLogoPath),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.seoDescription,
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: absoluteUrl(siteLogoPath) },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
