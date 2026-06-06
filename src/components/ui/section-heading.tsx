import { Reveal } from "@/components/ui/reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
};

export function SectionHeading({ eyebrow, title, subtitle, align = "center" }: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left";
  return (
    <Reveal className={alignment}>
      {eyebrow ? (
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-violet-400/90">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 font-[family-name:var(--font-brand)] text-3xl font-bold tracking-[-0.02em] text-white light:text-zinc-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-sm leading-relaxed text-zinc-400 light:text-zinc-600 sm:text-base">{subtitle}</p>
      ) : null}
    </Reveal>
  );
}
