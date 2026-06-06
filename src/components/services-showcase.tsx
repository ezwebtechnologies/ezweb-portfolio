"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ServiceCartoon } from "@/components/services/service-cartoons";
import { navItemContact } from "@/lib/site";

type Service = {
  id: string;
  headline: string;
  description: string;
  benefits: readonly string[];
  tag: string;
  gradient: string;
  rim: string;
};

type OrbitItem = Service;

const SERVICES: readonly Service[] = [
  {
    id: "websites",
    headline: "Premium websites",
    description:
      "Fast, mobile-first sites with clear structure and messaging so visitors trust you and act quickly.",
    benefits: ["Performance-focused builds", "Conversion-led layouts", "Mobile-first UX"],
    tag: "Web",
    gradient: "from-violet-600/35 via-fuchsia-500/15 to-transparent",
    rim: "from-violet-500 to-fuchsia-600",
  },
  {
    id: "google-business",
    headline: "Google Business",
    description:
      "Stronger Maps and local presence with a profile tuned for discovery, clarity, and credibility.",
    benefits: ["Profile & category tuning", "Photo & post rhythm", "Local discovery signals"],
    tag: "Maps",
    gradient: "from-blue-500/30 via-cyan-400/12 to-transparent",
    rim: "from-blue-500 to-cyan-400",
  },
  {
    id: "seo",
    headline: "SEO",
    description:
      "Practical on-page and technical foundations aligned with how people search for what you offer.",
    benefits: ["Keyword & structure clarity", "Crawl-friendly pages", "Content that answers intent"],
    tag: "SEO",
    gradient: "from-emerald-500/28 via-teal-400/12 to-transparent",
    rim: "from-emerald-500 to-teal-500",
  },
  {
    id: "leads",
    headline: "Lead generation",
    description:
      "Landing experiences and tracking that turn traffic into measurable inquiries—not vanity clicks.",
    benefits: ["Focused landing flows", "Forms that reduce friction", "Attribution you can trust"],
    tag: "Leads",
    gradient: "from-amber-500/25 via-orange-500/12 to-transparent",
    rim: "from-amber-500 to-orange-600",
  },
  {
    id: "automation",
    headline: "Business automation",
    description:
      "Automate inquiries and routine workflows so you spend less time on busywork and more on customers.",
    benefits: ["Workflow automation", "Customer inquiry handling", "Digital process optimization"],
    tag: "Auto",
    gradient: "from-sky-500/28 via-indigo-500/12 to-transparent",
    rim: "from-sky-500 to-indigo-600",
  },
];

const ITEMS: readonly OrbitItem[] = SERVICES;

const N = ITEMS.length;

const ringSpring = { type: "spring" as const, stiffness: 138, damping: 34, mass: 0.95 };
const ease = [0.22, 1, 0.36, 1] as const;

/** Active larger than small orbit nodes; large state follows `activeIndex`, not array position */
const ORBIT_SMALL_BASE = 82;
const ORBIT_LARGE_BASE = 248;

function readOrbitScale() {
  if (typeof window === "undefined") return 1;
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--ez-orbit-scale").trim();
  const scale = parseFloat(raw);
  return Number.isFinite(scale) ? scale : 1;
}

function orbitRadiusForWidth(width: number, scale: number) {
  const base = width < 480 ? 110 : width < 1024 ? 146 : 182;
  return Math.round(base * scale);
}

/** Inactive nodes share this semicircle (inset from ±90°) so the four small icons stay tight */
const ORBIT_CLUSTER_INSET_RAD = (9 * Math.PI) / 180;

/** Active at π (toward copy); four inactives evenly on the opposite semicircle — order follows ring index */
function slotAngleWorldRad(index: number, activeIndex: number) {
  const activeTheta = Math.PI;
  const smallStart = -Math.PI / 2 + ORBIT_CLUSTER_INSET_RAD;
  const smallEnd = Math.PI / 2 - ORBIT_CLUSTER_INSET_RAD;
  const span = smallEnd - smallStart;
  const cyclicOthers: number[] = [];
  for (let k = 1; k < N; k++) cyclicOthers.push((activeIndex + k) % N);
  if (index === activeIndex) return activeTheta;
  return smallStart + ((cyclicOthers.indexOf(index) + 0.5) * span) / (N - 1);
}

function ringGeometry(radius: number, activeIndex: number) {
  const slot = (index: number) => {
    const theta = slotAngleWorldRad(index, activeIndex);
    return { x: radius * Math.cos(theta), y: radius * Math.sin(theta), theta };
  };
  return { slot };
}

function CtaChevron({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 12l4-4-4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BenefitCheck({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8l3 3 7-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ServicesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [orbitR, setOrbitR] = useState(146);
  const [orbitScale, setOrbitScale] = useState(1);
  const reduceMotion = useReducedMotion();
  const active = ITEMS[activeIndex];

  useEffect(() => {
    const ro = () => {
      const w = window.innerWidth;
      const scale = readOrbitScale();
      setOrbitScale(scale);
      setOrbitR(orbitRadiusForWidth(w, scale));
    };
    ro();
    window.addEventListener("resize", ro);
    return () => window.removeEventListener("resize", ro);
  }, []);

  const { slot: ringSlot } = ringGeometry(orbitR, activeIndex);

  const pick = useCallback((i: number) => {
    setActiveIndex((prev) => (prev === i ? prev : i));
  }, []);

  const tFast = reduceMotion ? 0 : 0.24;
  const tSlow = reduceMotion ? 0 : 0.36;
  return (
    <section
      className="relative flex h-full min-h-0 w-full flex-col overflow-hidden px-4 pb-4 pt-3 sm:px-6 sm:pb-5 sm:pt-4 lg:pt-5"
      aria-labelledby="services-orbit-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 58% 45%, rgba(139, 92, 246, 0.12), transparent 62%), radial-gradient(ellipse 50% 40% at 20% 50%, rgba(139, 92, 246, 0.06), transparent 55%)",
        }}
      />

      <h3 id="services-orbit-heading" className="sr-only">
        Explore our services
      </h3>

      <div className="relative mx-auto flex h-full min-h-0 w-full max-w-6xl flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col gap-5 lg:flex-row lg:items-center lg:gap-0">
          <div className="relative z-30 min-h-0 w-full max-w-lg shrink-0 overflow-y-auto overscroll-y-contain lg:max-w-[min(100%,26rem)] lg:overflow-visible lg:pr-6 xl:pr-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                role="region"
                aria-live="polite"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 5 }}
                animate={{ opacity: 1, y: 0, transition: { duration: tSlow, ease } }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -3, transition: { duration: tFast, ease } }}
                className="flex flex-col gap-5"
              >
                <h3 className="font-[family-name:var(--font-brand)] text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl lg:text-[2rem] xl:text-4xl">
                  {active.headline}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400 sm:text-[0.9375rem]">{active.description}</p>
                <ul className="flex flex-col gap-2.5">
                  {active.benefits.map((b) => (
                    <li key={b} className="flex gap-3 text-sm text-zinc-300">
                      <BenefitCheck className="mt-0.5 size-4 shrink-0 text-violet-400/85" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <a
                    href={navItemContact.href}
                    className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-violet-500 px-7 text-sm font-medium text-white transition-colors hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400/55"
                  >
                    Get started
                    <CtaChevron className="opacity-90" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col lg:-translate-x-6 xl:-translate-x-10">
            <div
              className="pointer-events-none absolute inset-0 opacity-70 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle min(280px, 48vw) at 28% 50%, rgba(167, 139, 250, 0.14), transparent 72%)",
              }}
            />

            <div className="relative mx-auto flex min-h-0 w-full max-w-[min(100%,540px)] flex-1 items-center justify-center lg:mx-0 lg:max-w-none lg:justify-end lg:pr-2">
              <div className="relative aspect-square w-[min(88vw,calc(100dvh-var(--ez-nav-offset)-9rem))] max-w-[28rem] shrink-0 lg:w-[min(34rem,min(68dvh,calc(100dvh-var(--ez-nav-offset)-5rem)))]">
                <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative h-0 w-0 overflow-visible">
                    {ITEMS.map((item, i) => {
                      const { x, y } = ringSlot(i);
                      return (
                        <motion.div
                          key={item.id}
                          className="absolute left-0 top-0 overflow-visible"
                          style={{ width: 0, height: 0 }}
                          initial={false}
                          animate={{ x, y }}
                          transition={reduceMotion ? { duration: 0.15, ease } : ringSpring}
                        >
                          <OrbitNode
                            item={item}
                            isActive={i === activeIndex}
                            onPick={() => pick(i)}
                            reduceMotion={reduceMotion}
                            orbitScale={orbitScale}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OrbitNode({
  item,
  isActive,
  onPick,
  reduceMotion,
  orbitScale,
}: {
  item: OrbitItem;
  isActive: boolean;
  onPick: () => void;
  reduceMotion: boolean | null;
  orbitScale: number;
}) {
  const cartoonId = item.id;
  const label = item.headline;
  const iconPx = Math.round((isActive ? ORBIT_LARGE_BASE : ORBIT_SMALL_BASE) * orbitScale);
  const iconHalf = iconPx / 2;

  const nodeTransition = reduceMotion ? { duration: 0 } : ringSpring;

  return (
    <motion.button
      type="button"
      onClick={onPick}
      aria-current={isActive ? true : undefined}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      aria-label={`${label}${isActive ? ", selected" : ""}`}
      className={`group absolute flex flex-col items-center gap-2 border-0 bg-transparent p-0 text-center outline-none transition-[max-width] duration-300 ease-out ${isActive ? "max-w-[16rem]" : "max-w-[9rem]"}`}
      initial={false}
      animate={{ x: -iconHalf, y: -iconHalf }}
      transition={nodeTransition}
    >
      <motion.span
        className={`flex shrink-0 items-center justify-center overflow-visible transition-transform duration-300 ${isActive ? "scale-110" : "scale-100 group-hover:scale-105"}`}
        initial={false}
        animate={{ width: iconPx, height: iconPx }}
        transition={nodeTransition}
      >
        <ServiceCartoon id={cartoonId} active={isActive} className="size-full" />
      </motion.span>
      <span
        className={`pointer-events-none block w-full px-0.5 font-[family-name:var(--font-brand)] font-semibold leading-snug text-white transition-[font-size,opacity] duration-300 ease-out ${isActive ? "text-base sm:text-lg" : "text-[0.6875rem] sm:text-xs opacity-90"}`}
      >
        {label}
      </span>
    </motion.button>
  );
}
