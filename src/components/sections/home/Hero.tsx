import { Badge } from "@/components/ui/Badge";
import {
  ArrowRightIcon,
  ButtonLink,
  DownloadIcon,
} from "@/components/ui/Button";
import { PhoneChip, PhoneFrame } from "@/components/ui/PhoneFrame";
import { StarField } from "@/components/bg/StarField";
import { ShootingStars } from "@/components/bg/ShootingStars";
import { TechGrid } from "@/components/bg/TechGrid";
import { Glow } from "@/components/bg/Glow";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { MaskedLines } from "@/components/motion/MaskedLines";
import { Float } from "@/components/motion/Float";
import { Parallax } from "@/components/motion/Parallax";
import { CountUp } from "@/components/motion/CountUp";
import { ScaledStage } from "@/components/ui/ScaledStage";

const STATS = [
  { value: 1, suffix: "M+", label: "Người dùng", decimals: 0 },
  { value: 4.9, suffix: "★", label: "App Store", decimals: 1 },
  { value: 99, suffix: "%", label: "Uptime", decimals: 0 },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-space">
      {/* ---------- Nền ---------- */}
      <TechGrid />
      <Parallax y={70} className="absolute inset-0">
        <Glow
          color="#b4d001"
          size={600}
          opacity={0.17}
          blur={110}
          className="top-[-160px] left-[14%]"
        />
        <Glow
          color="#1d4ed8"
          size={500}
          opacity={0.2}
          blur={110}
          className="bottom-[-120px] left-[-60px]"
        />
        <Glow
          color="#b4d001"
          size={300}
          opacity={0.12}
          blur={90}
          className="top-[30%] left-[40%]"
        />
      </Parallax>
      <StarField seed={3} dots={82} sparkles={16} />
      <ShootingStars seed={11} count={6} />

      {/* ---------- Nội dung ---------- */}
      <div className="relative container-hero">
        <div className="flex flex-col items-center gap-14 py-16 text-center lg:flex-row lg:items-center lg:gap-6 lg:py-[118px] lg:text-left">
          {/* Cột chữ */}
          <div className="flex w-full max-w-2xl flex-col items-center lg:max-w-none lg:flex-1 lg:items-start lg:pr-12">
            <Reveal from="up" duration={0.7}>
              <Badge tone="lime">NỀN TẢNG SỐ THẾ HỆ MỚI</Badge>
            </Reveal>

            <MaskedLines
              as="h1"
              delay={0.12}
              className="mt-6 text-[clamp(2.25rem,6.2vw,3.5rem)] leading-[1.1] font-bold tracking-[-0.01em] text-snow"
              lines={["AI trả lời.", "Nhắn tin, gọi điện.", "Xác lập sở hữu."]}
              lineClassNames={[null, "text-gradient-lime", null]}
            />

            <Reveal
              as="p"
              from="up"
              delay={0.3}
              className="mt-6 max-w-[480px] text-[17px] leading-[1.75] text-haze"
            >
              Trợ lý AI, nhắn tin và gọi video, tin tức thị trường và Mindo Peer
              — chung một tài khoản
            </Reveal>

            <Reveal
              from="up"
              delay={0.42}
              className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <ButtonLink href="/#tai-app" variant="lime" size="lg">
                <DownloadIcon />
                Tải app miễn phí
              </ButtonLink>
              <ButtonLink href="#tinh-nang" variant="ghost-dark" size="lg">
                Xem tính năng
                <ArrowRightIcon className="size-3.5" />
              </ButtonLink>
            </Reveal>

            <Reveal
              as="p"
              from="up"
              delay={0.52}
              className="mt-6 text-[13px] leading-[18px] text-haze/60"
            >
              Miễn phí · Xác minh danh tính bằng CCCD
            </Reveal>

            <RevealStagger
              from="up"
              delay={0.6}
              stagger={0.09}
              className="mt-10 flex items-start gap-8"
            >
              {STATS.map((s) => (
                <RevealItem key={s.label} className="flex flex-col gap-0.5">
                  <span className="text-[22px] leading-7 font-bold text-snow">
                    <CountUp
                      value={s.value}
                      suffix={s.suffix}
                      decimals={s.decimals}
                    />
                  </span>
                  <span className="text-[12px] leading-4 text-slate-dim">
                    {s.label}
                  </span>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>

          {/* Cụm điện thoại */}
          <HeroPhones />
        </div>
      </div>
    </section>
  );
}

/**
 * Ba máy xếp lệch tầng: máy giữa lớn và thẳng, hai máy bên nhỏ hơn và hơi nghiêng.
 *
 * Cụm được dựng ở kích thước gốc 572×520 rồi thu nhỏ bằng `scale` theo
 * breakpoint — nhờ vậy tương quan vị trí giữa ba máy luôn giữ đúng như design.
 */
function HeroPhones() {
  return (
    <Reveal
      from="none"
      scale={0.94}
      delay={0.35}
      duration={1.2}
      className="w-full lg:w-auto lg:shrink-0"
    >
      <div className="flex justify-center">
        <ScaledStage
          width={572}
          height={520}
          // 572 × scale ≤ viewport − 48:
          //   320→0.47 | 360→0.54 | 390→0.59 | 430→0.66 | 640→0.82 | 768→0.95
          className="[--stage-scale:0.47] min-[360px]:[--stage-scale:0.54] min-[390px]:[--stage-scale:0.59] min-[430px]:[--stage-scale:0.66] sm:[--stage-scale:0.82] md:[--stage-scale:0.95] lg:[--stage-scale:1]"
        >
          {/* Máy bên trái — Trợ lý AI */}
          <Float
            amplitude={10}
            duration={5}
            delay={0.4}
            className="absolute top-[136px] left-0"
          >
            <div className="relative -rotate-4">
              <PhoneFrame
                src="/phones/hero-ai.png"
                alt="Màn hình trợ lý AI của Mindo đang lập kế hoạch tuần"
                width={165}
                glow={0.2}
                shadow="md"
                priority
              />
              <PhoneChip className="absolute -top-7 left-[51px]">
                Trợ lý AI
              </PhoneChip>
            </div>
          </Float>

          {/* Máy giữa — Trang chủ */}
          <Float
            amplitude={14}
            duration={4.2}
            className="absolute top-[65px] left-[181px]"
          >
            <div className="relative">
              <Glow
                color="#b4d001"
                size={330}
                opacity={0.35}
                blur={70}
                className="-top-15 -left-15"
              />
              <PhoneFrame
                src="/phones/hero-home.png"
                alt="Màn hình trang chủ ứng dụng Mindo"
                width={210}
                glow={0.35}
                shadow="lg"
                priority
              />
              <PhoneChip
                tone="solid"
                className="absolute top-[443px] left-[68px]"
              >
                Trang chủ
              </PhoneChip>
            </div>
          </Float>

          {/* Máy bên phải — Tin tức */}
          <Float
            amplitude={10}
            duration={5.4}
            delay={0.9}
            className="absolute top-[148px] left-[382px]"
          >
            <div className="relative rotate-4">
              <PhoneFrame
                src="/phones/hero-news.png"
                alt="Màn hình tin tức thị trường trong ứng dụng Mindo"
                width={165}
                glow={0.2}
                shadow="md"
                priority
              />
              <PhoneChip className="absolute -top-7 left-[54px]">
                Tin tức
              </PhoneChip>
            </div>
          </Float>
        </ScaledStage>
      </div>
    </Reveal>
  );
}
