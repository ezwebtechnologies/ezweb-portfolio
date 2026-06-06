import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteMission, siteVision } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="relative px-4 pt-20 pb-10 sm:px-6 sm:pt-28 sm:pb-12">
      <SectionHeading eyebrow="About us" title="More than websites. We build digital growth." />

      <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border border-white/[0.08] bg-gradient-to-br from-violet-500/10 to-transparent p-6 light:border-black/[0.07]">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-violet-400/90">Mission</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300 light:text-zinc-700">{siteMission}</p>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="h-full rounded-2xl border border-white/[0.08] bg-gradient-to-br from-fuchsia-500/10 to-transparent p-6 light:border-black/[0.07]">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-fuchsia-400/90">Vision</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300 light:text-zinc-700">{siteVision}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
