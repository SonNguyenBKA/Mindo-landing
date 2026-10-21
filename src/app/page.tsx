import { Hero } from "@/components/sections/home/Hero";
import { Capabilities } from "@/components/sections/home/Capabilities";
import { ProductStory } from "@/components/sections/home/ProductStory";
import { MindoPeer } from "@/components/sections/home/MindoPeer";
import { ThreeSteps } from "@/components/sections/home/ThreeSteps";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { PageMotion } from "@/components/motion/PageMotion";
import { News } from "@/components/sections/home/News";

export default function HomePage() {
  return (
    <PageMotion>
      <Hero />
      <Capabilities />
      <ProductStory />
      <News />
      <MindoPeer />
      <ThreeSteps />
      <FinalCta />
    </PageMotion>
  );
}
