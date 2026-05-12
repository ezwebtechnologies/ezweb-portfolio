import Link from "next/link";
import { navItemContact } from "@/lib/site";

const focusAreas = [
  {
    title: "Websites & landing pages",
    detail: "Performance-first builds with clear structure so visitors understand you quickly.",
  },
  {
    title: "Local discovery",
    detail: "Google Business Profile, maps visibility, and on-page SEO aligned to how people search.",
  },
  {
    title: "Leads & measurement",
    detail: "Forms, tracking, and reporting so you see which channels produce inquiries.",
  },
] as const;

export function WorkShowcase() {
  return (
    <section className="relative flex h-full min-h-0 w-full flex-col overflow-hidden px-4 pb-4 pt-3 sm:px-6 sm:pb-5 sm:pt-4 lg:pt-5">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 75% 52% at 55% 42%, rgba(139, 92, 246, 0.12), transparent 62%), radial-gradient(ellipse 48% 42% at 18% 48%, rgba(139, 92, 246, 0.06), transparent 55%)",
        }}
      />
      <div className="relative mx-auto flex h-full min-h-0 w-full max-w-6xl flex-1 flex-col gap-8 overflow-y-auto overscroll-y-contain py-2 lg:flex-row lg:items-center lg:gap-12 lg:overflow-hidden lg:py-0">
        <div className="min-h-0 shrink-0 lg:max-w-[min(100%,28rem)]">
          <h1 className="font-[family-name:var(--font-brand)] text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl lg:text-[2.25rem] xl:text-4xl">
            Work
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
            A snapshot of how we partner with local businesses—shipping fast sites, tightening local presence,
            and wiring measurement so growth is visible, not guessed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm font-medium text-zinc-100 transition-colors hover:border-violet-400/35 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400/50"
            >
              Back to home
            </Link>
            <Link
              href={navItemContact.href}
              className="inline-flex h-11 items-center justify-center rounded-full bg-violet-500 px-7 text-sm font-medium text-white transition-colors hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400/55"
            >
              {navItemContact.label}
            </Link>
          </div>
        </div>

        <div className="min-h-0 flex-1 lg:min-w-0">
          <ul className="flex flex-col gap-4 rounded-2xl border border-white/[0.12] bg-[color-mix(in_oklab,#0a0a10_72%,transparent)] p-5 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:p-6">
            {focusAreas.map((item) => (
              <li
                key={item.title}
                className="border-b border-white/[0.08] pb-4 last:border-b-0 last:pb-0"
              >
                <p className="font-[family-name:var(--font-brand)] text-base font-semibold text-white sm:text-lg">
                  {item.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
