export const siteProductionUrl = "https://ezweb.co.in" as const;

export const site = {
  name: "EZWeb",
  url: siteProductionUrl,
  /** Browser tab (next to favicon) & primary SEO title (keep to ~60 characters). */
  seoTitle: "EZWeb | Your Complete Digital Growth Partner",
  /** Meta description for search & link previews (~150–160 characters). */
  seoDescription:
    "EZWeb builds premium websites and grows local visibility with Google Business, SEO, and lead generation for businesses across India—Hyderabad, Bangalore & beyond.",
  keywords: [
    "EZWeb",
    "web design Hyderabad",
    "web design Bangalore",
    "website designers in India",
    "local business website",
    "Google Business Profile optimization",
    "local SEO Hyderabad",
    "local SEO Bangalore",
    "small business SEO India",
    "lead generation",
    "online branding",
  ],
} as const;

/** Inline UI (hero, orbit) — full-resolution brand art. */
export const siteLogoPath = "/logo/logo.png";

/** Founder headshots — place files under public/logo/founders/ */
export const siteFounderPhotos = {
  easwanth: "/logo/founders/easwanth-konduru.jpg",
  venkateswarlu: "/logo/founders/venkateswarlu-nerella.jpg",
} as const;

/** Square 512×512; used in metadata, PWA, and Organization `logo` for Google. */
export const siteStructuredLogoPath = "/icon.png";

export const siteOgImagePath = "/og-image.png";
export const siteFaviconPath = "/favicon.ico";
export const siteIcon192Path = "/icon-192.png";
export const siteAppleTouchIconPath = "/apple-touch-icon.png";

export type NavItem = { label: string; href: string };

/** Single-page anchor navigation — order matches page sections. */
export const navItemsPrimary: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Process", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const navItemContact: NavItem = navItemsPrimary[4];

export const siteTagline = "U Dream It. We Make It." as const;

export const siteMission =
  "To help businesses establish a powerful digital presence that attracts customers, builds trust, and drives sustainable growth." as const;

export const siteVision =
  "To become a trusted digital growth partner for businesses by helping them leverage technology, online marketing, and automation to achieve lasting success." as const;

/** Public inbox for inquiries; override with NEXT_PUBLIC_CONTACT_EMAIL in production. */
export const siteContactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "ezweb.helpdesk@gmail.com";

export type ContactPhone = { display: string; e164: string; tel: string; whatsapp: string };

function phone(display: string, e164: string): ContactPhone {
  return { display, e164, tel: `tel:+${e164}`, whatsapp: `https://wa.me/${e164}` };
}

export const siteContactPhones: readonly ContactPhone[] = [
  phone("+91 77779 12365", "917777912365"),
  phone("+91 88851 94997", "918885194997"),
];

/** Primary number — used for nav CTAs and structured data. */
export const sitePrimaryPhone = siteContactPhones[0];
export const siteContactPhoneE164 = sitePrimaryPhone.e164;
export const siteContactPhoneDisplay = sitePrimaryPhone.display;
export const siteWhatsAppUrl = sitePrimaryPhone.whatsapp;
export const siteContactPhoneTel = sitePrimaryPhone.tel;

export type Founder = { name: string; role: string; phone: ContactPhone; photo?: string };

export const siteFounders: readonly Founder[] = [
  {
    name: "Easwanth Konduru",
    role: "Founder",
    photo: siteFounderPhotos.easwanth,
    phone: siteContactPhones[0],
  },
  { name: "Venkateswarlu Nerella", role: "Co-founder", photo: siteFounderPhotos.venkateswarlu, phone: siteContactPhones[1] },
];

export const siteServiceAreas = ["India", "Hyderabad", "Bangalore"] as const;

export type SocialLink = { label: string; href: string };

/** Public social profile links. */
export const siteSocials: readonly SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com/ezweb" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ezweb-technologies-6a2074405/" },
  { label: "WhatsApp", href: siteWhatsAppUrl },
];

export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
