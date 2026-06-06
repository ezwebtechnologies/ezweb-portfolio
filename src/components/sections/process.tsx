"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/lib/content";

export function Process() {
  const reduce = useReducedMotion();

  return (
    <section id="process" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow="Our process"
        title="The roadmap to your growth."
        subtitle="A clear, proven path from understanding your business to growing it online."
      />

      <div className="relative mx-auto mt-14 max-w-4xl">
        <div className="pointer-events-none absolute inset-y-0 left-[1.4375rem] w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-violet-500/50 via-violet-500/25 to-fuchsia-500/50 md:left-1/2" />
        <div className="pointer-events-none absolute inset-y-3 left-[1.4375rem] -translate-x-1/2 border-l-2 border-dashed border-white/15 md:left-1/2" />

        <ol className="flex flex-col gap-7">
          {processSteps.map((step, i) => {
            const right = i % 2 === 1;
            return (
              <li key={step.title} className="relative">
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className={`relative pl-14 md:w-1/2 ${
                    right ? "md:ml-auto md:pl-14" : "md:pr-14 md:pl-0 md:text-right"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-[1.4375rem] z-10 flex size-9 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 font-[family-name:var(--font-brand)] text-sm font-bold text-white shadow-[0_0_0_4px_#050508,0_8px_24px_-8px_rgba(139,92,246,0.8)] ${
                      right
                        ? "md:left-0 md:-translate-x-1/2"
                        : "md:left-auto md:right-0 md:translate-x-1/2"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-colors duration-300 hover:border-violet-400/30">
                    <h3 className="font-[family-name:var(--font-brand)] text-base font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">{step.detail}</p>
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
