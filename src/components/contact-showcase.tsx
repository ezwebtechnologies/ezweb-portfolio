import Link from "next/link";
import { ContactCinematicFlow } from "@/components/contact/contact-cinematic-flow";
import { SocialLinks } from "@/components/social-links";
import { site } from "@/lib/site";

export function ContactShowcase() {
  return (
    <section className="relative flex min-h-dvh w-full flex-col px-4 pb-10 pt-24 sm:px-6 sm:pt-28">
      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col py-2 sm:py-3 lg:py-4">
        <div className="mb-6 flex shrink-0 flex-wrap items-center justify-between gap-3 sm:mb-7 lg:mb-6">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-500">Contact</p>
            <h1 className="mt-1 font-[family-name:var(--font-brand)] text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
              Start a conversation
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              className="inline-flex h-9 items-center rounded-full border border-white/12 bg-white/[0.04] px-4 text-xs font-medium text-zinc-200 transition-colors hover:border-violet-400/35 hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/#services"
              className="inline-flex h-9 items-center rounded-full border border-white/10 px-4 text-xs font-medium text-zinc-400 transition-colors hover:border-white/20 hover:text-zinc-200"
            >
              Services
            </Link>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col pt-1 pb-1 sm:pt-2 sm:pb-2">
          <ContactCinematicFlow />
        </div>

        <div className="mt-3 flex shrink-0 flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-[10px] leading-relaxed text-zinc-600">
            {site.name} uses your answers only to respond to this inquiry.
          </p>
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
