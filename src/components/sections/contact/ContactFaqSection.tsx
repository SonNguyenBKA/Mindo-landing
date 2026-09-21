import { SectionHeading } from "@/components/ui/SectionHeading";
import { Glow } from "@/components/bg/Glow";
import { StarField } from "@/components/bg/StarField";
import { ShootingStars } from "@/components/bg/ShootingStars";
import { Reveal } from "@/components/motion/Reveal";
import { ContactFaq } from "./ContactFaq";

export function ContactFaqSection() {
  return (
    <section className="relative overflow-hidden bg-mist py-20 lg:py-[57px]">
      {/* Ít sao hơn các section khác: đây là vùng nhiều chữ, cần dễ đọc */}
      <StarField seed={67} dots={0} sparkles={6} tone="light" />
      <ShootingStars seed={89} count={3} colors={["#a855f7", "#38bdf8"]} />

      <Glow
        color="#b4d001"
        size={400}
        opacity={0.12}
        blur={100}
        className="top-[110px] left-[36%]"
      />
      <Glow
        color="#1e6fd9"
        size={420}
        opacity={0.1}
        blur={100}
        className="top-[100px] left-[35%]"
      />

      <div className="relative container-mindo">
        <SectionHeading
          lines={["Có khi bạn không cần gửi"]}
          sub="Năm câu hay gặp nhất, trả lời ngay tại đây. Không thấy câu của bạn thì dùng biểu mẫu bên trên."
        />

        <Reveal from="up" delay={0.12} duration={0.9}>
          <ContactFaq />
        </Reveal>
      </div>
    </section>
  );
}
