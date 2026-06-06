"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { siteLogoPath } from "@/lib/site";

const SPLASH_KEY = "ez-splash";

export function SplashScreen() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SPLASH_KEY) === "1";
    } catch {}

    if (seen) return;

    setShow(true);
    try {
      sessionStorage.setItem(SPLASH_KEY, "1");
    } catch {}

    const t = setTimeout(() => setShow(false), reduce ? 600 : 2600);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050508]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            initial={reduce ? false : { scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={siteLogoPath} alt="EZWeb" width={120} height={120} priority unoptimized className="size-24 object-contain sm:size-28" />
          </motion.div>

          <div className="mt-6 h-7 overflow-hidden text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key="line1"
                className="font-[family-name:var(--font-brand)] text-base font-semibold tracking-tight text-zinc-300 sm:text-lg"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Building Your Digital Future
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            className="mt-2 bg-gradient-to-r from-violet-300 via-white to-violet-300 bg-clip-text font-[family-name:var(--font-brand)] text-lg font-bold tracking-tight text-transparent sm:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            U Dream It. We Make It.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
