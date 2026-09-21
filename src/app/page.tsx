import { Hero } from "@/components/sections/home/Hero";
import { Capabilities } from "@/components/sections/home/Capabilities";
import { AiAssistant } from "@/components/sections/home/AiAssistant";
import { News } from "@/components/sections/home/News";
import { MindoPeer } from "@/components/sections/home/MindoPeer";
import { ThreeSteps } from "@/components/sections/home/ThreeSteps";
import { Messaging } from "@/components/sections/home/Messaging";
import { FinalCta } from "@/components/sections/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Capabilities />
      <AiAssistant />
      <News />
      <MindoPeer />
      <ThreeSteps />
      <Messaging />
      <FinalCta />
    </>
  );
}
