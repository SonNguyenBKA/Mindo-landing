import type { ComponentType } from "react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { StarField } from "@/components/bg/StarField";
import { ShootingStars } from "@/components/bg/ShootingStars";
import { TechGrid } from "@/components/bg/TechGrid";
import { Glow } from "@/components/bg/Glow";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { MaskedLines } from "@/components/motion/MaskedLines";
import { Float } from "@/components/motion/Float";
import { ScaledStage } from "@/components/ui/ScaledStage";
import { Parallax } from "@/components/motion/Parallax";
import {
  CalendarIcon,
  ChatIcon,
  DocumentIcon,
  GlobeIcon,
  SparkleIcon,
} from "@/components/ui/Icons";

type AiFeature = {
  title: string;
  desc: string;
  Icon: ComponentType<{ className?: string }>;
  /** Màu nhấn dạng `r g b`. */
  accent: string;
  /** Độ đậm của nền ô. */
  bgAlpha: number;
  borderAlpha: number;
};

const FEATURES: AiFeature[] = [
  {
    title: "Hỏi đáp thông minh",
    desc: "Đa ngôn ngữ, đa chủ đề",
    Icon: ChatIcon,
    accent: "129 140 248",
    bgAlpha: 0.2,
    borderAlpha: 0.25,
  },
  {
    title: "Phân tích tài liệu",
    desc: "PDF, ảnh, hợp đồng",
    Icon: DocumentIcon,
    accent: "6 182 212",
    bgAlpha: 0.15,
    borderAlpha: 0.25,
  },
  {
    title: "Dịch đa ngôn ngữ",
    desc: "4 ngôn ngữ, giữ văn phong",
    Icon: GlobeIcon,
    accent: "180 208 1",
    bgAlpha: 0.12,
    borderAlpha: 0.28,
  },
  {
    title: "Lên kế hoạch",
    desc: "Lịch, nhắc việc, ưu tiên",
    Icon: CalendarIcon,
    accent: "167 139 250",
    bgAlpha: 0.15,
    borderAlpha: 0.25,
  },
];

export function AiAssistant() {
  return (
    <section
      id="tro-ly-ai"
      className="relative isolate scroll-below-header overflow-hidden bg-space py-20 lg:py-[106px]"
    >
      {/* ---------- Nền ---------- */}
      <TechGrid />
      <Parallax y={60} className="absolute inset-0">
        <Glow
          color="#6366f1"
          size={480}
          opacity={0.22}
          blur={110}
          className="top-[130px] left-[19%]"
        />
        <Glow
          color="#b4d001"
          size={320}
          opacity={0.16}
          blur={90}
          className="-top-15 left-[68%]"
        />
      </Parallax>
      <StarField seed={41} dots={64} sparkles={13} />
      <ShootingStars seed={17} count={4} />

      {/* ---------- Nội dung ---------- */}
      <div className="relative container-mindo">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:items-center lg:gap-16">
          {/* Cụm máy */}
          <AiPhone />

          {/* Cột chữ */}
          <div className="flex w-full max-w-xl flex-col items-start lg:flex-1">
            <Reveal from="up" duration={0.7}>
              <Badge tone="violet" icon={<SparkleIcon className="size-3" />}>
                TRỢ LÝ AI
              </Badge>
            </Reveal>

            <MaskedLines
              as="h2"
              delay={0.1}
              lines={["Trí tuệ nhân tạo", "đặt trong túi bạn"]}
              className="mt-5 bg-[linear-gradient(90deg,#f2f6fb_0%,#818cf8_45%,#b4d001_100%)] bg-clip-text text-[clamp(2rem,5vw,2.875rem)] leading-[1.15] font-bold tracking-[-0.01em] text-transparent"
            />

            <Reveal
              as="p"
              from="up"
              delay={0.26}
              className="mt-5 max-w-[480px] text-[16px] leading-7 text-haze"
            >
              Mindo AI không chỉ trả lời — nó hiểu ngữ cảnh, ghi nhớ cuộc trò
              chuyện, phân tích tài liệu và đưa ra gợi ý thông minh theo từng
              người dùng.
            </Reveal>

            <RevealStagger
              from="up"
              delay={0.34}
              stagger={0.08}
              className="mt-10 grid w-full max-w-[480px] grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {FEATURES.map((f) => (
                <RevealItem key={f.title}>
                  <AiFeatureTile {...f} />
                </RevealItem>
              ))}
            </RevealStagger>

            <Reveal from="up" delay={0.5} className="mt-8">
              <ButtonLink href="/#tai-app" variant="violet" size="md">
                <SparkleIcon className="size-4" />
                Thử Mindo AI ngay
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function AiFeatureTile({
  title,
  desc,
  Icon,
  accent,
  bgAlpha,
  borderAlpha,
}: AiFeature) {
  return (
    <div
      className="flex h-full items-start gap-3 rounded-xl border px-4 py-3.5 transition-transform duration-300 hover:-translate-y-0.5"
      style={{
        backgroundColor: `rgb(${accent} / ${bgAlpha})`,
        borderColor: `rgb(${accent} / ${borderAlpha})`,
      }}
    >
      <span
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-[10px] border bg-white/[0.06]"
        style={{
          borderColor: `rgb(${accent} / ${borderAlpha})`,
          // Icon vẽ bằng `currentColor` nên chỉ cần đặt màu chữ ở đây
          color: `rgb(${accent})`,
        }}
      >
        <Icon className="size-[18px]" />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[14px] leading-[19px] font-semibold text-snow">
          {title}
        </span>
        <span className="text-[12px] leading-4 text-slate-dim">{desc}</span>
      </span>
    </div>
  );
}

/**
 * Máy hiển thị khung chat AI, kèm vòng quỹ đạo nét đứt và hai chip nổi
 * ("Phản hồi < 1s", "4 ngôn ngữ") trôi lệch pha nhau.
 */
function AiPhone() {
  return (
    <Reveal
      from="none"
      scale={0.94}
      duration={1.1}
      className="w-full lg:w-auto lg:shrink-0"
    >
      <div className="flex justify-center">
        <ScaledStage
          width={300}
          height={520}
          className="[--stage-scale:0.7] sm:[--stage-scale:0.88] md:[--stage-scale:1]"
        >
          {/* Vòng quỹ đạo nét đứt */}
          <span
            aria-hidden="true"
            className="absolute top-5 -left-[90px] size-[480px] rounded-full border border-dashed border-haze/25 opacity-55"
          />

          <Float
            amplitude={12}
            duration={4.6}
            className="absolute top-0 left-[30px]"
          >
            <PhoneFrame
              src="/phones/ai-chat.png"
              alt="Màn hình trò chuyện với Mindo AI lập kế hoạch tuần"
              width={240}
              glow={0.35}
              glowColor="99 102 241"
              shadow="lg"
            />
          </Float>

          {/* Chip · Phản hồi */}
          <Float
            amplitude={8}
            duration={3.8}
            delay={0.5}
            className="absolute top-7 left-[210px] z-10"
          >
            <span className="inline-flex items-center gap-2 rounded-xl border border-accent-violet/35 bg-[rgb(4_18_42/0.85)] px-3 py-2 text-[12px] leading-4 font-semibold whitespace-nowrap text-white shadow-[0_8px_24px_0_rgb(99_102_241/0.2)] backdrop-blur-sm">
              <span className="size-2 shrink-0 rounded-full bg-[#22c55e]" />
              {"Phản hồi < 1s"}
            </span>
          </Float>

          {/* Chip · Ngôn ngữ */}
          <Float
            amplitude={8}
            duration={4.2}
            delay={1.1}
            className="absolute top-[438px] -left-8 z-10"
          >
            <span className="inline-flex items-center gap-2 rounded-xl border border-lime/30 bg-[rgb(4_18_42/0.85)] px-3 py-2 text-[12px] leading-4 font-semibold whitespace-nowrap text-lime shadow-[0_8px_24px_0_rgb(180_208_1/0.15)] backdrop-blur-sm">
              <GlobeIcon className="size-3.5" />4 ngôn ngữ
            </span>
          </Float>
        </ScaledStage>
      </div>
    </Reveal>
  );
}
