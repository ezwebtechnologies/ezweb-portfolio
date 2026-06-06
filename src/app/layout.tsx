import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { FloatingNavbar } from "@/components/navigation/floating-navbar";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { OrganizationJsonLd } from "@/components/organization-json-ld";
import { SplashScreen } from "@/components/splash-screen";
import {
  absoluteUrl,
  site,
  siteAppleTouchIconPath,
  siteFaviconPath,
  siteIcon192Path,
  siteOgImagePath,
  siteStructuredLogoPath,
} from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const brandFont = Syne({ variable: "--font-brand", subsets: ["latin"], weight: ["600", "700", "800"], display: "swap" });

const ogImageUrl = absoluteUrl(siteOgImagePath);
const canonicalUrl = absoluteUrl("/");

export const viewport: Viewport = {
  themeColor: "#050508",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seoTitle, template: `%s | ${site.name}` },
  description: site.seoDescription,
  applicationName: site.name,
  referrer: "origin-when-cross-origin",
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "business",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: canonicalUrl },
  icons: {
    icon: [
      { url: siteFaviconPath, sizes: "any" },
      { url: siteStructuredLogoPath, sizes: "512x512", type: "image/png" },
      { url: siteIcon192Path, sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: siteAppleTouchIconPath, sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: canonicalUrl,
    siteName: site.name,
    title: site.seoTitle,
    description: site.seoDescription,
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.seoTitle}`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seoTitle,
    description: site.seoDescription,
    images: [{ url: ogImageUrl, alt: `${site.name} — ${site.seoTitle}` }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${brandFont.variable} antialiased`}>
      <body className="min-h-dvh bg-background text-foreground">
        <OrganizationJsonLd />
        <SplashScreen />
        <FloatingNavbar />
        <main>{children}</main>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
