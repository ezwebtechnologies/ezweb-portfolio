import { FounderAvatar } from "@/components/sections/founder-avatar";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteFounders } from "@/lib/site";

export function Founders() {
  return (
    <section id="contact" className="relative px-4 pt-10 pb-20 sm:px-6 sm:pt-12 sm:pb-28">
      <SectionHeading
        eyebrow="The team"
        title="Built by founders, not handed off."
        subtitle="A small focused team delivering premium digital experiences for businesses across India."
      />

      <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
        {siteFounders.map((f, i) => (
          <Reveal key={f.name} delay={i * 0.1}>
            <article className="flex h-full flex-col items-center rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 text-center backdrop-blur-sm">
              <FounderAvatar name={f.name} photo={f.photo} />
              <h3 className="mt-5 font-[family-name:var(--font-brand)] text-lg font-semibold text-white">
                {f.name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-violet-300/80">{f.role}</p>
              <p className="mt-3 text-sm text-zinc-400">{f.phone.display}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <a
                  href={f.phone.tel}
                  className="inline-flex h-9 items-center rounded-full bg-violet-500 px-4 text-xs font-semibold text-white transition-colors hover:bg-violet-400"
                >
                  Call Now
                </a>
                <a
                  href={f.phone.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center rounded-full border border-white/15 bg-white/[0.04] px-4 text-xs font-semibold text-zinc-100 transition-colors hover:border-violet-400/40"
                >
                  WhatsApp
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
