"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { taglines } from "@/lib/content";
import { navItemContact, siteWhatsAppUrl } from "@/lib/site";

export function Hero() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % taglines.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative flex min-h-dvh items-center overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="ez-blob absolute -top-24 left-1/4 size-[34rem] rounded-full bg-violet-600/25 blur-[120px] light:bg-violet-400/30" />
        <div className="ez-blob-slow absolute -bottom-32 right-1/4 size-[30rem] rounded-full bg-fuchsia-600/20 blur-[120px] light:bg-fuchsia-400/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(139,92,246,0.12),transparent_60%)]" />
      </div>

      <div className="mx-auto w-full max-w-3xl text-center">
        <motion.h1
          className="font-[family-name:var(--font-brand)] text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white light:text-zinc-900 sm:text-6xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          U Dream It.{" "}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
            We Make It.
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 light:text-zinc-600 sm:text-base"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          Customers search online before they decide. If your business isn&apos;t visible, you&apos;re missing
          opportunities every day. EZWeb builds a premium online presence that attracts customers, builds trust,
          and drives growth.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          <a
            href={navItemContact.href}
            className="inline-flex h-12 items-center justify-center rounded-full bg-violet-500 px-8 text-sm font-semibold text-white shadow-[0_12px_36px_-10px_rgba(139,92,246,0.8)] transition-colors hover:bg-violet-400"
          >
            Get Free Consultation
          </a>
          <a
            href={siteWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 text-sm font-semibold text-zinc-100 transition-colors hover:border-violet-400/40 hover:bg-white/[0.07] light:border-black/15 light:bg-black/[0.03] light:text-zinc-800"
          >
            Chat on WhatsApp
          </a>
        </motion.div>

        <div className="mt-12 h-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              className="text-sm font-medium text-violet-300/90 light:text-violet-600 sm:text-[0.9375rem]"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
              transition={{ duration: 0.5 }}
            >
              {taglines[index]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
