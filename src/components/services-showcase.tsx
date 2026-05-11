"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { navItemContact, site, siteLogoPath } from "@/lib/site";

type Service = {
  id: string;
  headline: string;
  description: string;
  benefits: readonly string[];
  tag: string;
  gradient: string;
  rim: string;
};

type OrbitItem =
  | {
      kind: "brand";
      id: "ezweb";
      headline: string;
      description: string;
      benefits: readonly string[];
      tag: string;
    }
  | (Service & { kind: "service" });

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
];

const ITEMS: readonly OrbitItem[] = [
  {
    kind: "brand",
    id: "ezweb",
    headline: site.name,
    description:
      "We help local businesses build a strong online presence—websites, Google Business, SEO, leads, and branding—in one focused partnership.",
    benefits: ["Premium, fast websites", "Local discovery & SEO", "Clear leads & consistent branding"],
    tag: "Studio",
  },
  ...SERVICES.map((s) => ({ ...s, kind: "service" as const })),
];

const N = ITEMS.length;

const ringSpring = { type: "spring" as const, stiffness: 138, damping: 34, mass: 0.95 };
const ease = [0.22, 1, 0.36, 1] as const;

/** Active larger than small orbit nodes; large state follows `activeIndex`, not array position */
const ORBIT_SMALL_PX = 50;
const ORBIT_LARGE_PX = Math.round((136 * ORBIT_SMALL_PX) / 40);

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
  const reduceMotion = useReducedMotion();
  const active = ITEMS[activeIndex];

  useEffect(() => {
    const ro = () => {
      const w = window.innerWidth;
      setOrbitR(w < 480 ? 110 : w < 1024 ? 146 : 182);
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
      className="relative w-full overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-36 lg:pt-44 xl:pt-48"
      aria-labelledby="services-orbit-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 58% 45%, rgba(139, 92, 246, 0.12), transparent 62%), radial-gradient(ellipse 50% 40% at 20% 50%, rgba(139, 92, 246, 0.06), transparent 55%)",
        }}
      />

      <h1 className="sr-only">
        {site.name} — websites, local SEO, Google Business optimization, and online branding for local businesses
      </h1>
      <h2 id="services-orbit-heading" className="sr-only">
        Services
      </h2>

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-0 lg:min-h-[min(560px,78svh)]">
          <div className="relative z-30 w-full max-w-lg shrink-0 lg:max-w-[min(100%,26rem)] lg:pr-6 xl:pr-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.kind === "brand" ? "ezweb" : active.id}
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
                <p className="text-sm leading-relaxed text-zinc-400 sm:text-[15px]">{active.description}</p>
                <ul className="flex flex-col gap-2.5">
                  {active.benefits.map((b) => (
                    <li key={b} className="flex gap-3 text-sm text-zinc-300">
                      <BenefitCheck className="mt-0.5 size-4 shrink-0 text-violet-400/85" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  {active.kind === "brand" ? (
                    <>
                      <Link
                        href="/services"
                        className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-violet-500 px-7 text-sm font-medium text-white transition-colors hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400/55"
                      >
                        Explore
                        <CtaChevron className="opacity-90" />
                      </Link>
                      <Link
                        href={navItemContact.href}
                        className="text-sm font-medium text-zinc-400 underline-offset-4 transition-colors hover:text-white hover:underline"
                      >
                        Contact
                      </Link>
                    </>
                  ) : (
                    <Link
                      href={`${navItemContact.href}?topic=${active.id}`}
                      className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-violet-500 px-7 text-sm font-medium text-white transition-colors hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400/55"
                    >
                      Get started
                      <CtaChevron className="opacity-90" />
                    </Link>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-10 flex min-h-[min(52vh,440px)] w-full flex-1 lg:min-h-[min(60vh,520px)] lg:-translate-x-6 xl:-translate-x-10">
            <div
              className="pointer-events-none absolute inset-0 opacity-70 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle min(280px, 48vw) at 28% 50%, rgba(167, 139, 250, 0.14), transparent 72%)",
              }}
            />

            <div className="relative mx-auto flex h-full w-full max-w-[min(100%,540px)] items-center justify-center lg:mx-0 lg:max-w-none lg:justify-end lg:pr-2">
              <div className="relative h-[min(72vw,420px)] w-full min-w-0 lg:h-[min(76vw,480px)] lg:w-[min(92vw,560px)]">
                <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative h-0 w-0 overflow-visible">
                    {ITEMS.map((item, i) => {
                      const { x, y } = ringSlot(i);
                      return (
                        <motion.div
                          key={item.kind === "brand" ? "ezweb" : item.id}
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
}: {
  item: OrbitItem;
  isActive: boolean;
  onPick: () => void;
  reduceMotion: boolean | null;
}) {
  const isBrand = item.kind === "brand";
  const rim = isBrand
    ? "from-violet-500 to-fuchsia-600"
    : `bg-gradient-to-br ${item.rim}`;
  const label = isBrand ? site.name : item.headline;
  const iconPx = isActive ? ORBIT_LARGE_PX : ORBIT_SMALL_PX;
  const iconHalf = iconPx / 2;

  const nodeTransition = reduceMotion ? { duration: 0 } : ringSpring;

  return (
    <motion.button
      type="button"
      onClick={onPick}
      aria-current={isActive ? true : undefined}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      aria-label={`${label}${isActive ? ", selected" : ""}`}
      className={`group absolute flex flex-col items-center gap-1 border-0 bg-transparent p-0 text-center outline-none transition-[max-width] duration-300 ease-out ${isActive ? "max-w-[13rem]" : "max-w-[7rem]"}`}
      initial={false}
      animate={{ x: -iconHalf, y: -iconHalf }}
      transition={nodeTransition}
    >
      <motion.span
        className={`flex shrink-0 items-center justify-center rounded-full p-[1px] shadow-[0_0_28px_-6px_rgba(139,92,246,0.35)] transition-[box-shadow,ring-color] duration-300 group-hover:shadow-[0_0_36px_-4px_rgba(167,139,250,0.45)] group-focus-visible:ring-2 group-focus-visible:ring-violet-400/50 ${isBrand ? `bg-gradient-to-br ${rim}` : rim} ${isActive ? "ring-2 ring-violet-400/75 shadow-[0_0_48px_-6px_rgba(167,139,250,0.5)]" : "ring-1 ring-violet-400/25 group-hover:ring-violet-400/40"}`}
        initial={false}
        animate={{ width: iconPx, height: iconPx }}
        transition={nodeTransition}
      >
        <span className="flex size-full items-center justify-center rounded-full bg-[#07070c]/90 backdrop-blur-sm">
          {isBrand ? (
            <Image
              src={siteLogoPath}
              alt=""
              width={96}
              height={96}
              priority
              unoptimized
              className={`object-contain ${isActive ? "size-[58%]" : "size-[45%]"}`}
            />
          ) : (
            <span
              className={`max-w-[3.25rem] text-center font-[family-name:var(--font-brand)] font-semibold uppercase leading-tight text-white ${isActive ? "text-xs" : "text-[9px]"}`}
            >
              {item.tag}
            </span>
          )}
        </span>
      </motion.span>
      <span
        className={`pointer-events-none block w-full px-0.5 font-[family-name:var(--font-brand)] font-semibold leading-snug text-white transition-[font-size] duration-300 ease-out ${isActive ? "text-sm sm:text-base" : "text-[10px] sm:text-[11px]"}`}
      >
        {isBrand ? site.name : item.headline}
      </span>
    </motion.button>
  );
}
