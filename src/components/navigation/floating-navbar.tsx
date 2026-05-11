"use client";

import Link from "next/link";
import { navItemContact, navItemsPrimary, site, type NavItem } from "@/lib/site";

const linkClass =
  "relative whitespace-nowrap px-4 py-3.5 text-[14px] font-normal tracking-[0.12em] text-zinc-200 antialiased transition-colors duration-300 hover:text-white sm:px-6 sm:py-4 sm:text-[16px] sm:tracking-[0.13em]";

const linkGlowUnderline =
  "after:pointer-events-none after:absolute after:inset-x-4 after:bottom-2 after:h-[2px] after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-violet-400/90 after:to-transparent after:opacity-0 after:shadow-[0_0_14px_rgba(167,139,250,0.75)] after:transition-opacity after:duration-300 hover:after:opacity-100 sm:after:inset-x-5 sm:after:bottom-2.5";

function PrimaryNavLink({ item }: { item: NavItem }) {
  return (
    <Link href={item.href} className={`${linkClass} ${linkGlowUnderline}`}>
      {item.label}
    </Link>
  );
}

export function FloatingNavbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-6 sm:pt-7">
      <div className="relative w-full">
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="ez-nav-brand pointer-events-auto transition-[filter,opacity] duration-300 hover:opacity-95 hover:drop-shadow-[0_0_22px_rgba(167,139,250,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400/50"
        >
          <span className="block bg-gradient-to-br from-white via-violet-100 to-zinc-500 bg-clip-text font-[family-name:var(--font-brand)] text-[1.5625rem] font-semibold leading-none tracking-[-0.03em] text-transparent sm:text-[1.9375rem]">
            {site.name}
          </span>
        </Link>

        <div className="ez-nav-row flex w-full items-center justify-end sm:justify-center">
          <div className="ez-nav-float pointer-events-auto flex min-h-[58px] max-w-[min(100%,calc(100vw-14rem))] items-center rounded-full border border-white/[0.14] bg-[color-mix(in_oklab,#0c0c12_58%,transparent)] px-3 py-2.5 shadow-[0_20px_56px_-12px_rgba(0,0,0,0.82),0_0_0_1px_rgba(255,255,255,0.07)_inset,0_0_64px_-16px_rgba(139,92,246,0.26)] backdrop-blur-2xl backdrop-saturate-150 sm:min-h-[70px] sm:max-w-none sm:px-5 sm:py-3">
            <div className="hidden items-center sm:flex">
              <nav className="flex items-center" aria-label="Primary">
                {navItemsPrimary.map((item) => (
                  <PrimaryNavLink key={item.href} item={item} />
                ))}
              </nav>

              <span
                className="mx-2.5 h-6 w-px shrink-0 bg-gradient-to-b from-transparent via-white/25 to-transparent sm:mx-3 sm:h-7"
                aria-hidden
              />

              <a
                href={navItemContact.href}
                className={`${linkClass} rounded-full pl-4 pr-4 text-violet-100 transition-[color,box-shadow] duration-300 hover:text-white hover:shadow-[0_0_32px_-4px_rgba(167,139,250,0.62)] sm:pl-6 sm:pr-7 ${linkGlowUnderline}`}
              >
                {navItemContact.label}
              </a>
            </div>

            <details className="group relative sm:hidden">
              <summary className="flex min-h-[48px] cursor-pointer list-none items-center gap-2 rounded-full px-5 py-3 text-[14px] font-normal tracking-[0.13em] text-zinc-200 transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                <span>Menu</span>
                <span
                  className="text-xs text-zinc-500 transition-transform duration-300 group-open:rotate-180"
                  aria-hidden
                >
                  ▾
                </span>
              </summary>
              <div className="absolute right-0 top-[calc(100%+0.65rem)] z-50 min-w-[13.5rem] overflow-hidden rounded-2xl border border-white/12 bg-[color-mix(in_oklab,#08080c_94%,transparent)] p-3 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
                <nav className="flex flex-col" aria-label="Primary mobile">
                  {navItemsPrimary.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`${linkClass} rounded-lg px-4 py-3.5 text-center ${linkGlowUnderline}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <a
                    href={navItemContact.href}
                    className={`${linkClass} rounded-lg px-4 py-3.5 text-center text-violet-100 ${linkGlowUnderline}`}
                  >
                    {navItemContact.label}
                  </a>
                </nav>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
