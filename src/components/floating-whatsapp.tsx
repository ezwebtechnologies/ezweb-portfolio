import { siteWhatsAppUrl } from "@/lib/site";

export function FloatingWhatsApp() {
  return (
    <a
      href={siteWhatsAppUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with EZWeb on WhatsApp"
      className="ez-wa-pulse fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_-8px_rgba(37,211,102,0.7)] transition-transform duration-300 hover:scale-110 sm:bottom-7 sm:right-7"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.18-1.36a9.9 9.9 0 0 0 4.86 1.27h.01c5.5 0 9.96-4.46 9.96-9.96A9.9 9.9 0 0 0 12.04 2Zm5.84 14.06c-.25.7-1.45 1.34-2 1.42-.53.08-1.18.11-1.9-.12-.44-.14-1-.33-1.72-.64-3.03-1.31-5-4.36-5.16-4.56-.15-.2-1.23-1.63-1.23-3.11 0-1.48.78-2.21 1.05-2.51.27-.3.59-.38.79-.38l.57.01c.18.01.43-.07.67.51.25.6.85 2.08.92 2.23.08.15.13.32.02.52-.1.2-.16.32-.31.5-.15.17-.32.39-.46.52-.15.15-.31.31-.13.61.18.3.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.48 1.53.3.15.48.13.66-.08.18-.2.76-.89.96-1.19.2-.3.4-.25.67-.15.27.1 1.75.83 2.05.98.3.15.5.22.57.35.08.12.08.72-.17 1.42Z" />
      </svg>
    </a>
  );
}
