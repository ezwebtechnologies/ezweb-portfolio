type FixedMarketingPaneProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function FixedMarketingPane({ title, description, children }: FixedMarketingPaneProps) {
  return (
    <section className="relative flex h-full min-h-0 w-full flex-col overflow-hidden px-4 pb-4 pt-3 sm:px-6 sm:pb-5 sm:pt-4 lg:pt-5">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(139, 92, 246, 0.1), transparent 60%), radial-gradient(ellipse 45% 40% at 15% 55%, rgba(139, 92, 246, 0.05), transparent 55%)",
        }}
      />
      <div className="relative mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col justify-center overflow-y-auto overscroll-y-contain py-2">
        <h1 className="font-[family-name:var(--font-brand)] text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-[0.9375rem]">{description}</p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
