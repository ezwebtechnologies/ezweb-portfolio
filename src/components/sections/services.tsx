import { ServicesShowcase } from "@/components/services-showcase";

export function Services() {
  return (
    <section id="services" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto h-[32rem] max-w-6xl sm:h-[34rem] lg:h-[40rem]">
        <ServicesShowcase />
      </div>
    </section>
  );
}
