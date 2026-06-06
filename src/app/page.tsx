import { About } from "@/components/sections/about";
import { Footer } from "@/components/sections/footer";
import { Founders } from "@/components/sections/founders";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { WhoWeServe } from "@/components/sections/who-we-serve";
import { WhyOnline } from "@/components/sections/why-online";

export default function Home() {
  return (
    <>
      <Hero />
      <Process />
      <WhyOnline />
      <Services />
      <WhoWeServe />
      <About />
      <Founders />
      <Footer />
    </>
  );
}
