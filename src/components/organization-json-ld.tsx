import { absoluteUrl, site, siteStructuredLogoPath } from "@/lib/site";

export function OrganizationJsonLd() {
  const base = site.url.replace(/\/$/, "");
  const logoUrl = absoluteUrl(siteStructuredLogoPath);

  const graph = [
    {
      "@type": "Organization",
      "@id": `${base}/#organization`,
      name: site.name,
      url: site.url,
      description: site.seoDescription,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
        contentUrl: logoUrl,
        width: 512,
        height: 512,
      },
      image: logoUrl,
    },
    {
      "@type": "WebSite",
      "@id": `${base}/#website`,
      name: site.name,
      url: site.url,
      description: site.seoDescription,
      inLanguage: "en",
      publisher: { "@id": `${base}/#organization` },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  );
}
