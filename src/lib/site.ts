export const siteProductionUrl = "https://ezweb.co.in" as const;

export const site = {
  name: "EZWeb",
  url: siteProductionUrl,
  /** Browser tab (next to favicon) & primary SEO title (keep to ~60 characters). */
  seoTitle: "EZWeb | Websites for Businesses",
  /** Meta description for search & link previews (~150–160 characters). */
  seoDescription:
    "Premium websites, Google Business Profile optimization, local SEO, lead generation, and online branding for local businesses. Grow your visibility with EZWeb.",
  keywords: [
    "EZWeb",
    "local business website",
    "Google Business Profile",
    "Google Business optimization",
    "local SEO",
    "small business SEO",
    "lead generation",
    "online branding",
    "web design for local businesses",
  ],
} as const;

/** Inline UI (hero, orbit) — full-resolution brand art. */
export const siteLogoPath = "/logo/logo.png";

/** Square 512×512; used in metadata, PWA, and Organization `logo` for Google. */
export const siteStructuredLogoPath = "/icon.png";

export const siteOgImagePath = "/og-image.png";
export const siteFaviconPath = "/favicon.ico";
export const siteIcon192Path = "/icon-192.png";
export const siteAppleTouchIconPath = "/apple-touch-icon.png";

export type NavItem = { label: string; href: string };

export const navItemsPrimary: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

export const navItemContact: NavItem = {
  label: "Contact",
  href: "/contact",
};

/** Public inbox for inquiries; override with NEXT_PUBLIC_CONTACT_EMAIL in production. */
export const siteContactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "ezweb.helpdesk@gmail.com";

/** India mobile — digits only for wa.me / tel (no +). */
export const siteContactPhoneE164 = "917777912365";

export const siteContactPhoneDisplay = "+91 77779 12365";

export const siteWhatsAppUrl = `https://wa.me/${siteContactPhoneE164}`;

export const siteContactPhoneTel = `tel:+${siteContactPhoneE164}`;

export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
