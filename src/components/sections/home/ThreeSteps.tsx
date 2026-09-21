import type { ComponentType } from "react";
import { Badge } from "@/components/ui/Badge";
import { StarField } from "@/components/bg/StarField";
import { TechGrid } from "@/components/bg/TechGrid";
import { Glow } from "@/components/bg/Glow";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { MaskedLines } from "@/components/motion/MaskedLines";
import {
  CompassIcon,
  DownloadCloudIcon,
  IdCardIcon,
} from "@/components/ui/Icons";

type Step = {
  n: number;
  title: string;
  desc: string;
  Icon: ComponentType<{ className?: string }>;
  /** Màu nhấn của bước, dạng `r g b`. */
  rgb: string;
};

const STEPS: Step[] = [
  {
    n: 1,
    title: "Tải app Mindo",
    desc: "Có sẵn trên App Store và Google Play. Hoàn toàn miễn phí.",
    Icon: DownloadCloudIcon,
    rgb: "180 208 1",
  },
  {
    n: 2,
    title: "Tạo tài khoản",
    desc: "Đăng ký trong 30 giây. Xác minh để mở khóa đầy đủ tính năng.",
    Icon: IdCardIcon,
    rgb: "125 211 252",
  },
  {
    n: 3,
    title: "Khám phá",
    desc: "Trải nghiệm AI, nhắn tin, đọc tin tức và sở hữu Mindo Peer tức thì.",
    Icon: CompassIcon,
    rgb: "129 140 248",
  },
];

export function ThreeSteps() {
  return (
    <section className="relative isolate overflow-hidden bg-space py-20 lg:py-[95px]">
      {/* ---------- Nền ---------- */}
      <TechGrid />
      <Glow
        color="#1e6fd9"
        size="700px"
        opacity={0.14}
        blur={120}
        className="top-[138px] left-1/2 h-[300px] -translate-x-1/2 rounded-[50%]"
      />
      <StarField seed={73} dots={60} sparkles={11} />

      {/* ---------- Nội dung ---------- */}
      <div className="relative container-mindo">
        <div className="flex flex-col items-center">
          <Reveal from="up" duration={0.7}>
            <Badge
              tone="lime"
              size="sm"
              icon={
                <span className="size-2.5 shrink-0 rounded-full bg-lime/80 shadow-[0_0_8px_1px_rgb(180_208_1/0.6)]" />
              }
            >
              BẮT ĐẦU NGAY
            </Badge>
          </Reveal>

          <MaskedLines
            as="h2"
            delay={0.1}
            lines={["Ba bước đơn giản"]}
            className="mt-4 bg-[linear-gradient(90deg,#f2f6fb_0%,#7dd3fc_45%,#b4d001_100%)] bg-clip-text text-center text-[clamp(2rem,5vw,2.875rem)] leading-[1.2] font-bold tracking-[-0.01em] text-transparent"
          />

          {/* Lưới bước */}
          <div className="relative mt-16 w-full">
            {/* Đường nối giữa ba đĩa — chỉ hiện ở desktop khi các thẻ nằm ngang */}
            <div
              aria-hidden="true"
              className="absolute top-[52px] right-[19%] left-[19%] hidden h-px lg:block"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgb(180 208 1 / 0) 0%, rgb(180 208 1 / 0.3) 20%, rgb(30 111 217 / 0.4) 50%, rgb(180 208 1 / 0.3) 80%, rgb(180 208 1 / 0) 100%)",
              }}
            />

            <RevealStagger
              from="up"
              stagger={0.14}
              delay={0.15}
              className="relative grid gap-6 md:grid-cols-3"
            >
              {STEPS.map((s) => (
                <RevealItem key={s.n}>
                  <StepCard {...s} />
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ n, title, desc, Icon, rgb }: Step) {
  return (
    <article
      className="group flex h-full flex-col items-center rounded-[20px] border bg-[linear-gradient(166deg,rgb(255_255_255/0.04)_11%,rgb(255_255_255/0.01)_89%)] px-6 py-8 text-center shadow-[0_4px_32px_0_rgb(0_0_0/0.25)] transition-all duration-300 hover:-translate-y-1"
      style={{ borderColor: `rgb(${rgb} / 0.15)` }}
    >
      {/* Đĩa bước: viền sáng + lõi toả màu, số thứ tự gắn ở góc trên-phải */}
      <div
        className="relative size-14 shrink-0 rounded-full border transition-transform duration-300 group-hover:scale-105"
        style={{
          borderColor: `rgb(${rgb} / 0.3)`,
          backgroundImage: `radial-gradient(circle at center, rgb(${rgb} / 0.15) 0%, rgb(${rgb} / 0.1) 50%, rgb(4 18 42 / 0.8) 100%)`,
          filter: `drop-shadow(0 0 10px rgb(${rgb} / 0.15))`,
        }}
      >
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ color: `rgb(${rgb})` }}
        >
          <Icon className="size-[22px]" />
        </span>
        <span
          className="absolute -top-[5px] left-[39px] inline-flex size-5 items-center justify-center rounded-full text-[9px] leading-3 font-bold text-space"
          style={{ backgroundColor: `rgb(${rgb})` }}
        >
          {n}
        </span>
      </div>

      <h3 className="mt-5 text-[18px] leading-[25px] font-bold text-white">
        {title}
      </h3>
      <p className="mt-2 text-[14px] leading-[23px] text-[#7a92b0]">{desc}</p>
    </article>
  );
}
