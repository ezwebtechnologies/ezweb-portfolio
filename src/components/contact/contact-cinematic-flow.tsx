"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  site,
  siteContactEmail,
  siteContactPhoneDisplay,
} from "@/lib/site";

type FlowData = {
  fullName: string;
  services: string[];
  email: string;
  phone: string;
};

const initialData: FlowData = {
  fullName: "",
  services: [],
  email: "",
  phone: "",
};

const SERVICE_CATEGORIES = [
  { id: "Website", label: "Website" },
  { id: "Google Business & local SEO", label: "Google Business & local SEO" },
  { id: "SEO", label: "SEO" },
  { id: "Branding", label: "Branding" },
  { id: "Leads", label: "Leads" },
  { id: "Automation", label: "Automation" },
  { id: "Other / not sure", label: "Other / not sure" },
] as const;

const STEP_COUNT = 6;

function digitsOnly(s: string) {
  return s.replace(/\D/g, "");
}

function timeGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function validateAllData(d: FlowData): string | null {
  if (!d.fullName.trim()) return "Please share your name.";
  if (d.services.length === 0) return "Pick at least one service or category.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) return "Enter a valid email.";
  if (digitsOnly(d.phone).length < 10) return "Add a mobile number with at least 10 digits.";
  return null;
}

const stepEase = [0.19, 1, 0.22, 1] as const;

const fieldStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
} as const;

const fieldItem = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 420, damping: 28 },
  },
} as const;

export function ContactCinematicFlow() {
  const reduceMotion = useReducedMotion();
  const id = useId();
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const setFieldRef = useCallback((el: HTMLInputElement | HTMLTextAreaElement | null) => {
    inputRef.current = el;
  }, []);

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<FlowData>(initialData);
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "honeypot">("idle");

  const introFullText = useMemo(() => `${timeGreeting()} — welcome to ${site.name}.`, []);

  const progress = status !== "idle" ? 1 : (step + 1) / STEP_COUNT;

  useEffect(() => {
    const el = inputRef.current;
    const focusable = step > 0 && (step === 1 || step === 3 || step === 4);
    if (el && focusable) window.requestAnimationFrame(() => el.focus());
  }, [step]);

  const patch = useCallback(<K extends keyof FlowData>(key: K, value: FlowData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const validateStep = useCallback((): boolean => {
    setError(null);
    switch (step) {
      case 1:
        if (!data.fullName.trim()) {
          setError("Please share your name.");
          return false;
        }
        return true;
      case 2:
        if (data.services.length === 0) {
          setError("Pick at least one service or category.");
          return false;
        }
        return true;
      case 3:
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
          setError("Enter a valid email.");
          return false;
        }
        return true;
      case 4:
        if (digitsOnly(data.phone).length < 10) {
          setError("Add a mobile number with at least 10 digits.");
          return false;
        }
        return true;
      default:
        return true;
    }
  }, [step, data]);

  const next = useCallback(() => {
    setError(null);
    if (step >= STEP_COUNT - 1) return;
    if (step === 0 || validateStep()) {
      setDir(1);
      setStep((s) => Math.min(s + 1, STEP_COUNT - 1));
    }
  }, [step, validateStep]);

  const back = useCallback(() => {
    setError(null);
    setDir(-1);
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const toggleService = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.includes(id) ? prev.services.filter((x) => x !== id) : [...prev.services, id],
    }));
  }, []);

  const finalizeSubmit = useCallback(() => {
    setError(null);
    if (honeypot.trim()) {
      setStatus("honeypot");
      return;
    }
    const msg = validateAllData(data);
    if (msg) {
      setError(msg);
      return;
    }
    setStatus("success");
  }, [data, honeypot]);

  const variants = useMemo(
    () => ({
      enter: (direction: number) =>
        reduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              x: direction > 0 ? 40 : -40,
              y: 14,
              scale: 0.97,
            },
      center: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      },
      exit: (direction: number) =>
        reduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              x: direction < 0 ? 40 : -40,
              y: -12,
              scale: 0.985,
            },
    }),
    [reduceMotion],
  );

  const stepTransition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0.14 }
        : { type: "spring" as const, stiffness: 300, damping: 34, mass: 0.75 },
    [reduceMotion],
  );

  const assistantLine = useMemo(() => {
    if (status !== "idle") return "We will take it from here.";
    switch (step) {
      case 0:
        return "Let's shape your next move online.";
      case 1:
        return "I'd love to know your name.";
      case 2:
        return "What should we focus on? Pick everything that applies.";
      case 3:
        return "Where can we send ideas and next steps?";
      case 4:
        return "Best number to reach you on.";
      case 5:
        return "Review your details, then send. We will get back to you.";
      default:
        return "You're all set.";
    }
  }, [step, status]);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div className="relative mx-auto flex w-full max-w-xl flex-1 flex-col px-1 pt-3 sm:px-0 sm:pt-4">
        <div className="mb-6 w-full">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08] ring-1 ring-white/[0.04]">
            <motion.div
              className="h-full overflow-hidden rounded-full"
              initial={false}
              animate={{ width: `${Math.max(5, progress * 100)}%` }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 28 }}
            >
              <motion.div
                className="h-full min-w-[140%] rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-400 to-violet-400 shadow-[0_0_24px_-2px_rgba(167,139,250,0.55)]"
                style={{ backgroundSize: "200% 100%" }}
                initial={false}
                animate={
                  reduceMotion
                    ? {}
                    : { backgroundPosition: ["0% 50%", "200% 50%"] }
                }
                transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
        </div>

        <div className="relative mb-5 flex items-start gap-3 sm:gap-4">
          <motion.div
            layout
            className="relative flex size-11 shrink-0 items-center justify-center sm:size-12"
            aria-hidden
          >
            <motion.span
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/50 to-fuchsia-500/35 opacity-80 blur-md"
              animate={reduceMotion ? {} : { scale: [1, 1.06, 1], opacity: [0.75, 0.95, 0.75] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="relative flex size-10 items-center justify-center rounded-2xl border border-white/15 bg-[color-mix(in_oklab,#0c0c12_55%,transparent)] shadow-[0_0_24px_-4px_rgba(139,92,246,0.45)] backdrop-blur-xl sm:size-11">
              <motion.span
                className="font-[family-name:var(--font-brand)] text-sm font-bold text-white"
                animate={reduceMotion ? {} : { scale: [1, 1.04, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                E
              </motion.span>
            </span>
          </motion.div>
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-violet-300/90">EZWeb</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={`${step}-${status}`}
                className="mt-1 text-sm leading-snug text-zinc-300 sm:text-[15px]"
                aria-live="polite"
                initial={reduceMotion ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={reduceMotion ? { duration: 0.12 } : { duration: 0.38, ease: stepEase }}
              >
                {assistantLine}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative min-h-0 flex-1">
          <input
            type="text"
            name="company_website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="absolute -left-[9999px] h-px w-px opacity-0"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
          />

          <AnimatePresence mode="wait" custom={dir}>
            {status === "success" || status === "honeypot" ? (
              <motion.div
                key="done"
                role="status"
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={stepTransition}
                className="flex flex-col items-center py-6 text-center"
              >
                <motion.div
                  className="mb-5 flex size-16 items-center justify-center rounded-full border border-emerald-400/35 bg-emerald-500/15 shadow-[0_0_40px_-8px_rgba(52,211,153,0.35)]"
                  initial={reduceMotion ? false : { scale: 0.5, opacity: 0, rotate: -12 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 22 }}
                >
                  <svg className="size-8 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                      initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : {
                              pathLength: { delay: 0.12, duration: 0.42, ease: stepEase },
                              opacity: { duration: 0.15 },
                            }
                      }
                    />
                  </svg>
                </motion.div>
                <motion.h2
                  className="font-[family-name:var(--font-brand)] text-2xl font-semibold text-white"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reduceMotion ? { duration: 0.12 } : { type: "spring", stiffness: 380, damping: 28, delay: 0.06 }
                  }
                >
                  Thank you
                </motion.h2>
                <motion.p
                  className="mt-3 max-w-sm text-sm text-zinc-400"
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reduceMotion ? { duration: 0.12 } : { type: "spring", stiffness: 360, damping: 30, delay: 0.12 }
                  }
                >
                  {status === "honeypot"
                    ? "If you are a real visitor with a project, tap Email us to reach the team."
                    : "Thanks for sending your details. We will get back to you soon."}
                </motion.p>
                <motion.div
                  className="mt-8 flex flex-wrap justify-center gap-3"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reduceMotion ? { duration: 0.12 } : { type: "spring", stiffness: 340, damping: 28, delay: 0.18 }
                  }
                >
                  <Link
                    href="/"
                    className="inline-flex h-11 items-center rounded-full border border-white/15 bg-white/[0.05] px-6 text-sm text-zinc-200 transition-colors hover:border-violet-400/35 hover:text-white"
                  >
                    Home
                  </Link>
                  <a
                    href={`mailto:${siteContactEmail}?subject=${encodeURIComponent("EZWeb inquiry follow-up")}`}
                    className="inline-flex h-11 items-center rounded-full border border-violet-500/35 bg-violet-500/15 px-6 text-sm font-medium text-violet-100 transition-colors hover:bg-violet-500/25"
                  >
                    Email us
                  </a>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                role="group"
                aria-labelledby={`${id}-step-title`}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={stepTransition}
                className="flex min-h-[12rem] flex-col"
              >
                <h2 id={`${id}-step-title`} className="sr-only">
                  Contact step {step + 1}
                </h2>

                {step === 0 && (
                  <motion.div
                    className="flex flex-1 flex-col justify-center"
                    variants={fieldStagger}
                    initial="hidden"
                    animate="show"
                  >
                    <motion.div variants={fieldItem}>
                      <IntroTypingLine introFullText={introFullText} reduceMotion={reduceMotion} />
                    </motion.div>
                    <motion.p variants={fieldItem} className="mt-4 text-sm text-zinc-500">
                      Name, what you need, email, mobile, then a quick review.
                    </motion.p>
                    <motion.div variants={fieldItem} className="mt-10 self-start">
                      <motion.button
                        type="button"
                        onClick={next}
                        data-sound-unlock
                        className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-zinc-950 shadow-[0_0_40px_-8px_rgba(255,255,255,0.35)]"
                        whileHover={reduceMotion ? {} : { y: -3, scale: 1.02, boxShadow: "0 0 48px -6px rgba(255,255,255,0.45)" }}
                        whileTap={reduceMotion ? {} : { scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 500, damping: 26 }}
                      >
                        Begin
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    className="flex min-h-0 flex-1 flex-col"
                    variants={fieldStagger}
                    initial="hidden"
                    animate="show"
                  >
                    <motion.div variants={fieldItem} className="flex min-h-0 flex-1 flex-col">
                      <FieldBlock label="Full name" error={error} reduceMotion={!!reduceMotion}>
                        <input
                          ref={setFieldRef}
                          value={data.fullName}
                          onChange={(e) => patch("fullName", e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && next()}
                          className="w-full rounded-2xl border border-white/12 bg-black/40 px-4 py-3.5 text-base text-white outline-none transition-[border-color,box-shadow] placeholder:text-zinc-600 focus:border-violet-400/45 focus:ring-2 focus:ring-violet-500/20"
                          placeholder="Your full name"
                          autoComplete="name"
                        />
                      </FieldBlock>
                    </motion.div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    className="flex min-h-0 flex-1 flex-col"
                    variants={fieldStagger}
                    initial="hidden"
                    animate="show"
                  >
                    <motion.div variants={fieldItem} className="flex min-h-0 flex-1 flex-col">
                      <FieldBlock label="Service or focus" error={error} reduceMotion={!!reduceMotion}>
                        <div className="flex flex-wrap gap-2">
                          {SERVICE_CATEGORIES.map((s, i) => (
                            <Chip
                              key={s.id}
                              index={i}
                              selected={data.services.includes(s.id)}
                              onClick={() => toggleService(s.id)}
                              reduceMotion={!!reduceMotion}
                            >
                              {s.label}
                            </Chip>
                          ))}
                        </div>
                      </FieldBlock>
                    </motion.div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    className="flex min-h-0 flex-1 flex-col"
                    variants={fieldStagger}
                    initial="hidden"
                    animate="show"
                  >
                    <motion.div variants={fieldItem} className="flex min-h-0 flex-1 flex-col">
                      <FieldBlock label="Email" error={error} reduceMotion={!!reduceMotion}>
                        <input
                          ref={setFieldRef}
                          type="email"
                          value={data.email}
                          onChange={(e) => patch("email", e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && next()}
                          className="w-full rounded-2xl border border-white/12 bg-black/40 px-4 py-3.5 text-base text-white outline-none placeholder:text-zinc-600 focus:border-violet-400/45 focus:ring-2 focus:ring-violet-500/20"
                          placeholder="you@example.com"
                          autoComplete="email"
                        />
                      </FieldBlock>
                    </motion.div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    className="flex min-h-0 flex-1 flex-col"
                    variants={fieldStagger}
                    initial="hidden"
                    animate="show"
                  >
                    <motion.div variants={fieldItem} className="flex min-h-0 flex-1 flex-col">
                      <FieldBlock label="Mobile number" error={error} reduceMotion={!!reduceMotion}>
                        <input
                          ref={setFieldRef}
                          type="tel"
                          value={data.phone}
                          onChange={(e) => patch("phone", e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && next()}
                          className="w-full rounded-2xl border border-white/12 bg-black/40 px-4 py-3.5 text-base text-white outline-none placeholder:text-zinc-600 focus:border-violet-400/45 focus:ring-2 focus:ring-violet-500/20"
                          placeholder={siteContactPhoneDisplay}
                          autoComplete="tel"
                        />
                      </FieldBlock>
                    </motion.div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div
                    className="flex flex-1 flex-col"
                    variants={fieldStagger}
                    initial="hidden"
                    animate="show"
                  >
                    <motion.p variants={fieldItem} className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                      Summary
                    </motion.p>
                    <ul className="mt-4 space-y-2.5 text-sm text-zinc-300">
                      <SummaryRow k="Name" v={data.fullName} index={0} reduceMotion={!!reduceMotion} />
                      <SummaryRow k="Looking for" v={data.services.join(", ")} index={1} reduceMotion={!!reduceMotion} />
                      <SummaryRow k="Email" v={data.email} index={2} reduceMotion={!!reduceMotion} />
                      <SummaryRow k="Mobile" v={data.phone} index={3} reduceMotion={!!reduceMotion} />
                    </ul>
                    {error ? (
                      <p className="mt-4 text-sm text-amber-200/95" role="alert">
                        {error}
                      </p>
                    ) : null}
                    <motion.p
                      variants={fieldItem}
                      className="mt-6 text-xs leading-relaxed text-zinc-600"
                    >
                      When you are ready, tap Send. We will follow up using your email or mobile.
                    </motion.p>
                  </motion.div>
                )}

                {step >= 1 && step <= 5 && status === "idle" && (
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.06] pt-6">
                    <button
                      type="button"
                      onClick={back}
                      className="text-sm text-zinc-500 transition-colors hover:text-zinc-300 disabled:opacity-30"
                      disabled={step <= 0}
                    >
                      Back
                    </button>
                    {step < 5 ? (
                      <motion.button
                        type="button"
                        onClick={next}
                        className="inline-flex h-11 items-center rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 text-sm font-medium text-white shadow-[0_12px_40px_-12px_rgba(139,92,246,0.55)]"
                        whileHover={
                          reduceMotion ? {} : { scale: 1.04, y: -2, boxShadow: "0 16px 48px -8px rgba(139,92,246,0.65)" }
                        }
                        whileTap={reduceMotion ? {} : { scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 480, damping: 22 }}
                      >
                        Continue
                      </motion.button>
                    ) : (
                      <motion.button
                        type="button"
                        onClick={finalizeSubmit}
                        className="inline-flex h-11 items-center rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 text-sm font-medium text-white shadow-[0_12px_40px_-12px_rgba(139,92,246,0.55)]"
                        whileHover={
                          reduceMotion ? {} : { scale: 1.04, y: -2, boxShadow: "0 16px 48px -8px rgba(139,92,246,0.65)" }
                        }
                      >
                        Send
                      </motion.button>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({
  k,
  v,
  index,
  reduceMotion,
}: {
  k: string;
  v: string;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 400, damping: 28, delay: 0.04 + index * 0.07 }
      }
      className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2"
      whileHover={reduceMotion ? {} : { scale: 1.01, borderColor: "rgba(255,255,255,0.12)" }}
    >
      <span className="w-28 shrink-0 text-zinc-500">{k}</span>
      <span className="min-w-0 flex-1 text-zinc-200">{v}</span>
    </motion.li>
  );
}

function Chip({
  children,
  index,
  selected,
  onClick,
  reduceMotion,
}: {
  children: React.ReactNode;
  index: number;
  selected: boolean;
  onClick: () => void;
  reduceMotion: boolean;
}) {
  return (
    <motion.button
      type="button"
      layout={!reduceMotion}
      onClick={onClick}
      initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.92, rotate: -1 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 440, damping: 26, delay: index * 0.04 }
      }
      className={`rounded-full border px-4 py-2.5 text-sm transition-colors ${
        selected
          ? "border-violet-400/60 bg-violet-500/20 text-white shadow-[0_0_24px_-4px_rgba(139,92,246,0.55)]"
          : "border-white/10 bg-black/35 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
      }`}
      whileHover={reduceMotion ? {} : { y: -3, scale: 1.03 }}
      whileTap={reduceMotion ? {} : { scale: 0.94 }}
    >
      {children}
    </motion.button>
  );
}

function IntroTypingLine({
  introFullText,
  reduceMotion,
}: {
  introFullText: string;
  reduceMotion: boolean | null;
}) {
  const [shown, setShown] = useState(() => (reduceMotion ? introFullText : ""));

  useEffect(() => {
    if (reduceMotion) return;
    let cancelled = false;
    let i = 0;
    const run = () => {
      if (cancelled) return;
      i += 1;
      setShown(introFullText.slice(0, i));
      if (i < introFullText.length) window.setTimeout(run, 22);
    };
    const tid = window.setTimeout(run, 60);
    return () => {
      cancelled = true;
      window.clearTimeout(tid);
    };
  }, [introFullText, reduceMotion]);

  return (
    <motion.p
      className="min-h-[3.5rem] text-balance text-lg font-light leading-relaxed tracking-[-0.02em] text-zinc-100 sm:text-xl"
      initial={false}
    >
      {shown}
      {!reduceMotion && shown.length > 0 && shown.length < introFullText.length && (
        <motion.span
          className="ml-0.5 inline-block h-5 w-px translate-y-0.5 bg-violet-400"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 0.9, repeat: Infinity }}
          aria-hidden
        />
      )}
    </motion.p>
  );
}

function FieldBlock({
  label,
  optional,
  error,
  reduceMotion,
  children,
}: {
  label: string;
  optional?: boolean;
  error: string | null;
  reduceMotion: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <label className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
        {label}
        {optional ? <span className="ml-1 font-normal normal-case tracking-normal text-zinc-600">(optional)</span> : null}
      </label>
      <div className="mt-3 flex-1">{children}</div>
      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            key={error}
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.22, ease: stepEase }}
            className="mt-2 text-sm text-amber-200/95"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
