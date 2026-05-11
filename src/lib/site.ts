export const site = {
  name: "EZWeb",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ezweb.co.in",
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

export const siteLogoPath = "/logo/logo.png";

export type NavItem = { label: string; href: string };

export const navItemsPrimary: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

export const navItemContact: NavItem = {
  label: "Contact",
  href: "/contact",
};

export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
