import {
  absoluteUrl,
  site,
  siteContactEmail,
  siteContactPhones,
  siteFounders,
  siteServiceAreas,
  siteSocials,
  siteStructuredLogoPath,
} from "@/lib/site";

export function OrganizationJsonLd() {
  const base = site.url.replace(/\/$/, "");
  const logoUrl = absoluteUrl(siteStructuredLogoPath);

  const graph = [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${base}/#organization`,
      name: site.name,
      url: site.url,
      email: siteContactEmail,
      description: site.seoDescription,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
        contentUrl: logoUrl,
        width: 512,
        height: 512,
      },
      image: logoUrl,
      telephone: siteContactPhones.map((p) => `+${p.e164}`),
      areaServed: siteServiceAreas.map((name) => ({ "@type": "AdministrativeArea", name })),
      founder: siteFounders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.role })),
      contactPoint: siteContactPhones.map((p) => ({
        "@type": "ContactPoint",
        telephone: `+${p.e164}`,
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["en", "te", "hi"],
      })),
      sameAs: siteSocials.map((s) => s.href),
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
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
