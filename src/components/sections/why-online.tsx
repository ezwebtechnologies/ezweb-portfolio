"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { stats } from "@/lib/content";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function WhyOnline() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow="Why it matters"
        title="If customers can't find you, they can't choose you."
      />

      <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 text-center backdrop-blur-sm light:border-black/[0.07] light:bg-black/[0.02]"
          >
            <p className="font-[family-name:var(--font-brand)] text-4xl font-bold tracking-tight text-violet-300 light:text-violet-600">
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-3 text-xs leading-relaxed text-zinc-400 light:text-zinc-600">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
