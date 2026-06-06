"use client";

import { useState } from "react";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Monogram({ name }: { name: string }) {
  return (
    <div className="flex size-28 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 font-[family-name:var(--font-brand)] text-3xl font-bold text-white shadow-[0_12px_36px_-10px_rgba(139,92,246,0.7)] sm:size-32">
      {initials(name)}
    </div>
  );
}

export function FounderAvatar({ name, photo }: { name: string; photo?: string }) {
  const [failed, setFailed] = useState(false);

  if (!photo || failed) {
    return <Monogram name={name} />;
  }

  return (
    <div className="relative size-28 shrink-0 overflow-hidden rounded-full bg-zinc-800 shadow-[0_12px_36px_-10px_rgba(139,92,246,0.7)] ring-2 ring-violet-400/30 sm:size-32">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo}
        alt={name}
        width={128}
        height={128}
        decoding="async"
        className="size-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
