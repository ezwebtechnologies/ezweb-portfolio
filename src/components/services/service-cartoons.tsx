import type { ReactNode } from "react";

type ServiceCartoonProps = {
  id: string;
  active?: boolean;
  className?: string;
};

type CartoonProps = { className?: string; active?: boolean };

export function ServiceCartoon({ id, active = false, className = "" }: ServiceCartoonProps) {
  const glow = active
    ? "drop-shadow-[0_0_40px_rgba(139,92,246,0.35)] drop-shadow-[0_16px_40px_rgba(0,0,0,0.55)]"
    : "drop-shadow-[0_12px_32px_rgba(0,0,0,0.55)]";

  const props = { className: `${className} ${glow}`, active };

  switch (id) {
    case "websites":
      return <CartoonWebsites {...props} />;
    case "google-business":
      return <CartoonGoogleBusiness {...props} />;
    case "seo":
      return <CartoonSeo {...props} />;
    case "leads":
      return <CartoonLeads {...props} />;
    case "automation":
      return <CartoonAutomation {...props} />;
    case "branding":
      return <CartoonBranding {...props} />;
    default:
      return <CartoonWebsites {...props} />;
  }
}

function GlassPlate({
  accent,
  uid,
  children,
}: {
  accent: string;
  uid: string;
  children: ReactNode;
}) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#14141f" />
          <stop offset="100%" stopColor="#0a0a10" />
        </linearGradient>
        <linearGradient id={`${uid}-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.12" />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.28" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="64" cy="112" rx="34" ry="6" fill="#000" opacity="0.45" />
      <circle cx="64" cy="58" r="52" fill={`url(#${uid}-glow)`} />
      <rect
        x="18"
        y="22"
        width="92"
        height="84"
        rx="18"
        fill={`url(#${uid}-bg)`}
        stroke={`url(#${uid}-rim)`}
        strokeWidth="1.25"
      />
      {children}
    </>
  );
}

function PremiumLabel({ y, label, accent }: { y: number; label: string; accent: string }) {
  const w = label.length * 6.4 + 18;
  return (
    <g>
      <rect
        x={64 - w / 2}
        y={y}
        width={w}
        height="14"
        rx="7"
        fill="#0c0c14"
        fillOpacity="0.92"
        stroke={accent}
        strokeOpacity="0.45"
        strokeWidth="1"
      />
      <text
        x="64"
        y={y + 10}
        textAnchor="middle"
        fill="#e4e4e7"
        fontSize="7.5"
        fontWeight="600"
        letterSpacing="0.14em"
      >
        {label.toUpperCase()}
      </text>
    </g>
  );
}

function CartoonWebsites({ className }: CartoonProps) {
  const uid = "web";
  const accent = "#a78bfa";

  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" role="img" aria-label="Premium websites">
      <GlassPlate accent={accent} uid={uid}>
        <rect x="28" y="36" width="54" height="36" rx="6" fill="#1a1a28" stroke={accent} strokeOpacity="0.35" strokeWidth="1" />
        <rect x="28" y="36" width="54" height="8" rx="6" fill={accent} fillOpacity="0.2" />
        <circle cx="34" cy="40" r="1.5" fill={accent} fillOpacity="0.8" />
        <circle cx="39" cy="40" r="1.5" fill={accent} fillOpacity="0.45" />
        <circle cx="44" cy="40" r="1.5" fill={accent} fillOpacity="0.25" />
        <rect x="34" y="50" width="22" height="3" rx="1.5" fill={accent} fillOpacity="0.55" />
        <rect x="34" y="56" width="38" height="2" rx="1" fill="#52525b" fillOpacity="0.7" />
        <rect x="34" y="61" width="30" height="2" rx="1" fill="#52525b" fillOpacity="0.45" />
        <rect x="34" y="66" width="16" height="5" rx="2.5" fill={accent} fillOpacity="0.75" />
        <rect x="72" y="48" width="22" height="38" rx="5" fill="#12121c" stroke={accent} strokeOpacity="0.4" strokeWidth="1" />
        <rect x="76" y="54" width="14" height="24" rx="2" fill="#1e1e2e" />
        <rect x="78" y="58" width="10" height="2" rx="1" fill={accent} fillOpacity="0.6" />
        <rect x="78" y="63" width="10" height="2" rx="1" fill="#71717a" fillOpacity="0.5" />
        <rect x="78" y="70" width="7" height="4" rx="2" fill={accent} fillOpacity="0.5" />
        <path d="M52 76v6M42 82h20" stroke={accent} strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" />
        <PremiumLabel y={92} label="Websites" accent={accent} />
      </GlassPlate>
    </svg>
  );
}

function CartoonGoogleBusiness({ className }: CartoonProps) {
  const uid = "maps";
  const accent = "#67e8f9";

  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" role="img" aria-label="Google Business">
      <GlassPlate accent={accent} uid={uid}>
        <path
          d="M30 78c10-6 22-10 34-10s24 4 34 10"
          stroke={accent}
          strokeOpacity="0.25"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M38 68c7-4 17-7 26-7s19 3 26 7"
          stroke={accent}
          strokeOpacity="0.18"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <rect x="36" y="54" width="56" height="30" rx="6" fill="#0f172a" stroke={accent} strokeOpacity="0.3" strokeWidth="1" />
        <path d="M36 62h56" stroke={accent} strokeOpacity="0.2" strokeWidth="1" />
        <rect x="44" y="66" width="14" height="12" rx="2" fill={accent} fillOpacity="0.15" />
        <rect x="62" y="66" width="14" height="12" rx="2" fill={accent} fillOpacity="0.15" />
        <path
          d="M64 30c-8 0-14 6-14 14 0 11 14 26 14 26s14-15 14-26c0-8-6-14-14-14z"
          fill="#1e3a5f"
          stroke={accent}
          strokeWidth="1.25"
        />
        <circle cx="64" cy="44" r="7" fill="#0c1222" stroke={accent} strokeOpacity="0.5" strokeWidth="1" />
        <circle cx="64" cy="44" r="3" fill={accent} fillOpacity="0.85" />
        <g fill={accent} fillOpacity="0.75">
          <circle cx="42" cy="86" r="1.5" />
          <circle cx="48" cy="86" r="1.5" />
          <circle cx="54" cy="86" r="1.5" />
          <circle cx="60" cy="86" r="1.5" />
          <circle cx="66" cy="86" r="1.5" />
        </g>
        <PremiumLabel y={92} label="Maps" accent={accent} />
      </GlassPlate>
    </svg>
  );
}

function CartoonSeo({ className }: CartoonProps) {
  const uid = "seo";
  const accent = "#6ee7b7";

  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" role="img" aria-label="SEO">
      <GlassPlate accent={accent} uid={uid}>
        <rect x="28" y="34" width="72" height="22" rx="11" fill="#0f1f1a" stroke={accent} strokeOpacity="0.35" strokeWidth="1" />
        <circle cx="40" cy="45" r="5" fill={accent} fillOpacity="0.2" stroke={accent} strokeOpacity="0.5" strokeWidth="1" />
        <path d="M38 45h4M40 43v4" stroke={accent} strokeOpacity="0.8" strokeWidth="1.2" strokeLinecap="round" />
        <rect x="50" y="42" width="40" height="2" rx="1" fill="#52525b" fillOpacity="0.6" />
        <rect x="50" y="47" width="28" height="2" rx="1" fill="#52525b" fillOpacity="0.35" />
        <rect x="30" y="64" width="68" height="28" rx="6" fill="#0f1f1a" stroke={accent} strokeOpacity="0.25" strokeWidth="1" />
        <path
          d="M38 82l14-16 10 8 18-22"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="38" cy="82" r="2.5" fill={accent} fillOpacity="0.9" />
        <circle cx="80" cy="52" r="2.5" fill={accent} fillOpacity="0.9" />
        <rect x="88" y="38" width="18" height="18" rx="9" fill="#14532d" stroke={accent} strokeOpacity="0.45" strokeWidth="1" />
        <text x="97" y="51" textAnchor="middle" fill={accent} fontSize="10" fontWeight="700">
          1
        </text>
        <PremiumLabel y={92} label="SEO" accent={accent} />
      </GlassPlate>
    </svg>
  );
}

function CartoonLeads({ className }: CartoonProps) {
  const uid = "leads";
  const accent = "#fbbf24";

  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" role="img" aria-label="Lead generation">
      <GlassPlate accent={accent} uid={uid}>
        <path
          d="M36 38h56l-8 22H44L36 38z"
          fill="#1c1910"
          stroke={accent}
          strokeOpacity="0.45"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        <rect x="44" y="62" width="40" height="5" rx="2" fill={accent} fillOpacity="0.35" />
        <path
          d="M48 67l5 18h22l5-18"
          fill="#14120c"
          stroke={accent}
          strokeOpacity="0.4"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        <rect x="38" y="88" width="52" height="14" rx="5" fill="#0f0f14" stroke={accent} strokeOpacity="0.35" strokeWidth="1" />
        <rect x="44" y="93" width="24" height="2" rx="1" fill={accent} fillOpacity="0.55" />
        <rect x="44" y="97" width="16" height="2" rx="1" fill="#52525b" fillOpacity="0.5" />
        <circle cx="30" cy="42" r="3" fill={accent} fillOpacity="0.7" />
        <circle cx="64" cy="32" r="3" fill={accent} fillOpacity="0.85" />
        <circle cx="98" cy="44" r="3" fill={accent} fillOpacity="0.6" />
        <path d="M30 42l18 14M64 35v19M98 44L82 58" stroke={accent} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 3" />
        <rect x="78" y="36" width="20" height="14" rx="4" fill="#12121c" stroke={accent} strokeOpacity="0.4" strokeWidth="1" />
        <path d="M81 42h14M81 46h10" stroke={accent} strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round" />
        <circle cx="94" cy="38" r="5" fill="#7f1d1d" stroke={accent} strokeOpacity="0.6" strokeWidth="1" />
        <circle cx="94" cy="38" r="2" fill={accent} fillOpacity="0.95" />
        <PremiumLabel y={92} label="Leads" accent={accent} />
      </GlassPlate>
    </svg>
  );
}

function CartoonAutomation({ className }: CartoonProps) {
  const uid = "auto";
  const accent = "#7dd3fc";

  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" role="img" aria-label="Business automation">
      <GlassPlate accent={accent} uid={uid}>
        <g stroke={accent} strokeOpacity="0.55" strokeWidth="1.25" fill="#10131f">
          <path d="M52 38l3-6h6l3 6 6 1 3 5-3 5-6 1-3 6h-6l-3-6-6-1-3-5 3-5 6-1z" strokeLinejoin="round" />
        </g>
        <circle cx="58" cy="44" r="5" fill="#0c1020" stroke={accent} strokeOpacity="0.7" strokeWidth="1" />
        <circle cx="58" cy="44" r="1.6" fill={accent} />
        <g stroke={accent} strokeOpacity="0.4" strokeWidth="1.1" fill="#0f1320">
          <path d="M82 58l2-4h4l2 4 4 1 2 4-2 4-4 1-2 4h-4l-2-4-4-1-2-4 2-4z" strokeLinejoin="round" />
        </g>
        <circle cx="86" cy="64" r="3" fill="#0c1020" stroke={accent} strokeOpacity="0.6" strokeWidth="1" />
        <path d="M36 78h26m0 0l-4-3m4 3l-4 3" stroke={accent} strokeOpacity="0.45" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="32" y="82" width="64" height="6" rx="3" fill={accent} fillOpacity="0.12" />
        <PremiumLabel y={92} label="Auto" accent={accent} />
      </GlassPlate>
    </svg>
  );
}

function CartoonBranding({ className }: CartoonProps) {
  const uid = "brand";
  const accent = "#fb7185";

  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" role="img" aria-label="Branding and presence">
      <GlassPlate accent={accent} uid={uid}>
        <circle cx="64" cy="52" r="20" fill="#1c1014" stroke={accent} strokeOpacity="0.45" strokeWidth="1.25" />
        <text x="64" y="60" textAnchor="middle" fill={accent} fontSize="20" fontWeight="800" letterSpacing="-0.02em">
          EZ
        </text>
        <path d="M44 38l-3-5M84 38l3-5M64 30v-5" stroke={accent} strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" />
        <g fill={accent}>
          <path d="M40 30l1.2 2.6 2.8.3-2.1 1.9.6 2.8L40 36.2l-2.5 1.4.6-2.8-2.1-1.9 2.8-.3z" fillOpacity="0.85" />
          <path d="M90 44l1 2.2 2.4.2-1.8 1.6.5 2.4L90 49l-2.1 1.2.5-2.4-1.8-1.6 2.4-.2z" fillOpacity="0.7" />
        </g>
        <rect x="40" y="80" width="48" height="6" rx="3" fill={accent} fillOpacity="0.18" />
        <rect x="48" y="80" width="32" height="6" rx="3" fill={accent} fillOpacity="0.35" />
        <PremiumLabel y={92} label="Brand" accent={accent} />
      </GlassPlate>
    </svg>
  );
}
