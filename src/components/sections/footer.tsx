import Image from "next/image";
import { SocialLinks } from "@/components/social-links";
import { site, siteLogoPath, siteTagline } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <Image src={siteLogoPath} alt="EZWeb" width={28} height={28} unoptimized className="size-6 shrink-0 object-contain" />
          <div className="min-w-0">
            <p className="font-[family-name:var(--font-brand)] text-sm font-bold tracking-tight text-white">{site.name}</p>
            <p className="truncate text-xs text-zinc-500">{siteTagline}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <SocialLinks compact />
          <p className="text-[0.6875rem] text-zinc-600 sm:border-l sm:border-white/10 sm:pl-4">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
