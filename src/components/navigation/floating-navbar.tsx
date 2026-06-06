"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navItemsPrimary, site, siteLogoPath, siteWhatsAppUrl } from "@/lib/site";

export function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/[0.07] bg-[#050508]/80 backdrop-blur-xl light:border-black/[0.06] light:bg-white/80"
          : "border-b border-transparent bg-transparent"
      }`}
      style={{ height: "var(--ez-nav-h)" }}
    >
      <nav className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#home" aria-label={`${site.name} — home`} className="flex items-center gap-2.5">
          <Image src={siteLogoPath} alt="EZWeb" width={36} height={36} priority unoptimized className="size-8 object-contain" />
          <span className="bg-gradient-to-br from-white via-violet-100 to-zinc-400 bg-clip-text font-[family-name:var(--font-brand)] text-xl font-bold tracking-tight text-transparent light:from-black light:via-violet-700 light:to-zinc-600">
            {site.name}
          </span>
        </a>

        <div className="hidden items-center lg:flex">
          {navItemsPrimary.map((item) => (
            <a key={item.href} href={item.href} className="ez-nav-link">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={siteWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-9 items-center rounded-full bg-violet-500 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-400 sm:inline-flex"
          >
            WhatsApp
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-zinc-200 transition-colors hover:text-white light:border-black/10 light:bg-black/[0.03] light:text-zinc-700 lg:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/[0.07] bg-[#050508]/95 px-4 pb-4 pt-2 backdrop-blur-xl light:border-black/[0.06] light:bg-white/95 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col">
            {navItemsPrimary.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="ez-nav-link rounded-lg px-3 py-3"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
