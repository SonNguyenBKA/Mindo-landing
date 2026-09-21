import { Badge } from "@/components/ui/Badge";
import { StarField } from "@/components/bg/StarField";
import { ShootingStars } from "@/components/bg/ShootingStars";
import { TechGrid } from "@/components/bg/TechGrid";
import { Glow, Nebula } from "@/components/bg/Glow";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { MaskedLines } from "@/components/motion/MaskedLines";
import { Parallax } from "@/components/motion/Parallax";

const QUICK_FACTS = [
  "Phản hồi trong 24 giờ làm việc",
  "Hỗ trợ tiếng Việt và English",
];

export function ContactHero() {
  return (
    <section className="relative isolate overflow-hidden bg-space py-16 lg:py-20">
      {/* ---------- Nền ---------- */}
      <Nebula
        color="#1d4ed8"
        coreColor="#60a5fa"
        size={640}
        opacity={0.2}
        className="top-[150px] -left-[150px]"
      />
      <Nebula
        color="#b4d001"
        size={760}
        opacity={0.18}
        className="-top-[300px] left-[53%]"
      />
      <TechGrid />
      <Parallax y={50} className="absolute inset-0">
        <Glow
          color="#b4d001"
          size={600}
          opacity={0.14}
          blur={110}
          className="-top-60 left-[14%]"
        />
        <Glow
          color="#1d4ed8"
          size={500}
          opacity={0.18}
          blur={110}
          className="top-[180px] -left-15"
        />
      </Parallax>
      <StarField seed={5} dots={64} sparkles={12} />
      <ShootingStars seed={31} count={4} />

      {/* ---------- Nội dung ---------- */}
      <div className="relative container-mindo">
        <div className="mx-auto flex max-w-[700px] flex-col items-center text-center">
          <Reveal from="up" duration={0.7}>
            <Badge tone="lime">LIÊN HỆ VỚI MINDO</Badge>
          </Reveal>

          <MaskedLines
            as="h1"
            delay={0.12}
            lines={["Nói chuyện với", "đội ngũ Mindo"]}
            className="mt-6 bg-[linear-gradient(90deg,#f2f6fb_0%,#b4d001_55%,#7dd3fc_100%)] bg-clip-text text-[clamp(2.125rem,5.6vw,3.25rem)] leading-[1.12] font-bold tracking-[-0.01em] text-transparent"
          />

          <Reveal
            as="p"
            from="up"
            delay={0.3}
            className="mt-5 max-w-[660px] text-[17px] leading-[1.75] text-haze"
          >
            Cần hỗ trợ tài khoản hay muốn sở hữu Mindo Peer theo giá đại lý —
            chọn đúng kênh bên dưới rồi gửi nội dung, đội ngũ phụ trách sẽ trả
            lời trực tiếp.
          </Reveal>

          <RevealStagger
            from="up"
            delay={0.42}
            stagger={0.1}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {QUICK_FACTS.map((fact) => (
              <RevealItem key={fact} as="span">
                <span className="inline-flex items-center gap-2 rounded-xl border border-haze/20 bg-haze/[0.06] px-4 py-2.5 text-[13px] leading-[18px] text-haze">
                  <span className="size-1.5 shrink-0 rounded-full bg-lime" />
                  {fact}
                </span>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
