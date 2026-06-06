import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { audiences } from "@/lib/content";

const palette = [
  "from-violet-500/15 to-transparent border-violet-400/25 hover:border-violet-400/50",
  "from-cyan-500/15 to-transparent border-cyan-400/25 hover:border-cyan-400/50",
  "from-emerald-500/15 to-transparent border-emerald-400/25 hover:border-emerald-400/50",
  "from-amber-500/15 to-transparent border-amber-400/25 hover:border-amber-400/50",
  "from-fuchsia-500/15 to-transparent border-fuchsia-400/25 hover:border-fuchsia-400/50",
  "from-blue-500/15 to-transparent border-blue-400/25 hover:border-blue-400/50",
  "from-rose-500/15 to-transparent border-rose-400/25 hover:border-rose-400/50",
  "from-teal-500/15 to-transparent border-teal-400/25 hover:border-teal-400/50",
  "from-indigo-500/15 to-transparent border-indigo-400/25 hover:border-indigo-400/50",
];

export function WhoWeServe() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow="Who we serve"
        title="Tailored digital solutions for every industry."
        subtitle="No matter your field, we connect you with the customers already looking for you."
      />

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3">
        {audiences.map((a, i) => (
          <Reveal key={a} delay={(i % 3) * 0.06}>
            <div
              className={`flex h-full items-center justify-center rounded-2xl border bg-gradient-to-br px-4 py-6 text-center text-sm font-medium text-zinc-100 transition-colors duration-300 hover:text-white ${palette[i % palette.length]}`}
            >
              {a}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
