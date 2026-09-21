import Image from "next/image";
import type { ComponentType } from "react";
import { Badge } from "@/components/ui/Badge";
import { StarField } from "@/components/bg/StarField";
import { ShootingStars } from "@/components/bg/ShootingStars";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { MaskedLines } from "@/components/motion/MaskedLines";
import { Float } from "@/components/motion/Float";
import { ScaledStage } from "@/components/ui/ScaledStage";
import { ChatIcon, PhoneIcon, VideoIcon } from "@/components/ui/Icons";

type Feature = {
  title: string;
  desc: string;
  tags: string[];
  Icon: ComponentType<{ className?: string }>;
  /** Màu nhấn dạng `r g b`. */
  rgb: string;
};

const FEATURES: Feature[] = [
  {
    title: "Gọi video HD",
    desc: "Nhóm đến 50 người, nền ảo AI, lọc tiếng ồn. Chất lượng 1080p kể cả đường truyền yếu.",
    tags: ["HD 1080p", "50 người", "Nền ảo AI"],
    Icon: VideoIcon,
    rgb: "125 211 252",
  },
  {
    title: "Gọi thoại miễn phí",
    desc: "VoIP chất lượng cao không cước phí, không giới hạn thời gian, mã hoá đầu cuối.",
    tags: ["VoIP 0đ", "E2E"],
    Icon: PhoneIcon,
    rgb: "129 140 248",
  },
  {
    title: "Nhắn tin tức thì",
    desc: "Chat cá nhân & nhóm 500 người, file, sticker, tin nhắn tự xoá và phòng chat bí mật.",
    tags: ["500 người", "Tự xoá"],
    Icon: ChatIcon,
    rgb: "143 168 0",
  },
];

export function Messaging() {
  return (
    <section className="relative overflow-hidden bg-mist-cool py-20 lg:py-[96px]">
      {/* Nền sao — màu ăn theo tông lam của section liên lạc */}
      {/*
        `dots={0}`: nền sáng chỉ dùng sao 4 cánh có màu, đúng như Figma.
        Chấm sao nhỏ màu xám trên nền trắng vừa giống hạt bụi, vừa tương phản
        quá thấp nên có nhấp nháy cũng không nhìn ra.
      */}
      <StarField seed={83} dots={0} sparkles={12} tone="light" />
      <ShootingStars
        seed={71}
        count={7}
        colors={["#3b82f6", "#818cf8", "#38bdf8", "#a855f7"]}
      />

      <div className="relative container-mindo">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:items-center lg:gap-14">
          <ContactPhones />

          {/* Cột chữ */}
          <div className="flex w-full flex-col items-start lg:flex-1">
            <Reveal from="up" duration={0.7}>
              <Badge
                tone="blue"
                size="sm"
                icon={<PhoneIcon className="size-2.5 shrink-0" />}
              >
                KẾT NỐI MỌI LÚC
              </Badge>
            </Reveal>

            <MaskedLines
              as="h2"
              delay={0.1}
              lines={["Gọi video, gọi thoại", "và nhắn tin tức thì"]}
              className="mt-5 bg-[linear-gradient(90deg,#021c41_0%,#1e6fd9_50%,#818cf8_100%)] bg-clip-text text-[clamp(1.875rem,4.6vw,2.75rem)] leading-[1.15] font-bold tracking-[-0.01em] text-transparent"
            />

            <Reveal
              as="p"
              from="up"
              delay={0.26}
              className="mt-5 max-w-[460px] text-[16px] leading-[1.8] text-slate-dim"
            >
              Mindo tích hợp đầy đủ hệ thống liên lạc — từ tin nhắn tức thì đến
              video call HD nhiều người — trong một ứng dụng duy nhất.
            </Reveal>

            <RevealStagger
              from="right"
              delay={0.3}
              stagger={0.12}
              className="mt-10 flex w-full flex-col gap-3"
            >
              {FEATURES.map((f) => (
                <RevealItem key={f.title}>
                  <FeatureRow {...f} />
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureRow({ title, desc, tags, Icon, rgb }: Feature) {
  return (
    <article
      className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border px-5 py-4 shadow-[0_2px_16px_0_rgb(0_0_0/0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_26px_0_rgb(0_0_0/0.09)]"
      style={{
        borderColor: `rgb(${rgb} / 0.16)`,
        backgroundImage: `linear-gradient(90deg, #ffffff 0%, #ffffff 55%, rgb(${rgb} / 0.05) 100%)`,
      }}
    >
      {/* Quầng sáng góc trên-phải */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 right-0 size-45 rounded-full"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgb(${rgb} / 0.22) 0%, transparent 70%)`,
          filter: "blur(24px)",
        }}
      />
      {/* Hoa văn chấm mờ ở dải trên */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[115px] opacity-50"
        style={{
          backgroundImage: `radial-gradient(rgb(${rgb} / 0.45) 1px, transparent 1px)`,
          backgroundSize: "12px 12px",
          maskImage:
            "linear-gradient(to bottom, #000 0%, transparent 100%), linear-gradient(to left, #000 0%, transparent 60%)",
          maskComposite: "intersect",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, transparent 100%), linear-gradient(to left, #000 0%, transparent 60%)",
          WebkitMaskComposite: "source-in",
        }}
      />

      <span
        className="relative inline-flex size-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105"
        style={{
          backgroundColor: `rgb(${rgb} / 0.1)`,
          borderColor: `rgb(${rgb} / 0.22)`,
          color: `rgb(${rgb})`,
        }}
      >
        <Icon className="size-5" />
      </span>

      <div className="relative min-w-0 flex-1">
        <h3 className="text-[15px] leading-[21px] font-bold text-[#021c41]">
          {title}
        </h3>
        <p className="mt-1.5 text-[13px] leading-[21px] text-slate-dim">
          {desc}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] leading-4 font-medium"
              style={{
                color: `rgb(${rgb})`,
                borderColor: `rgb(${rgb} / 0.18)`,
                backgroundColor: `rgb(${rgb} / 0.08)`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

/**
 * Ba máy: nhắn tin (nghiêng trái), gọi video (giữa, lớn nhất), gọi thoại
 * (nghiêng phải). Ảnh đã là màn hình app trần nên chỉ cần bo góc + bóng đổ,
 * không dùng khung `PhoneFrame`.
 */
function ContactPhones() {
  return (
    <Reveal
      from="none"
      scale={0.93}
      duration={1.1}
      className="w-full lg:w-auto lg:shrink-0"
    >
      <div className="flex justify-center">
        <ScaledStage
          width={380}
          height={420}
          // 380 × scale ≤ viewport − 48:
          //   320→0.68 | 360→0.78 | 390→0.82 | 640→0.95
          className="[--stage-scale:0.68] min-[360px]:[--stage-scale:0.78] min-[390px]:[--stage-scale:0.82] sm:[--stage-scale:0.95] lg:[--stage-scale:1]"
        >
          {/* Nhắn tin — nghiêng trái */}
          <Float
            amplitude={10}
            duration={5}
            delay={0.3}
            className="absolute top-[100px] left-0"
          >
            <PhoneShot
              src="/phones/chat.png"
              alt="Màn hình nhắn tin trong ứng dụng Mindo"
              label="Nhắn tin"
              width={140}
              height={278}
              rotate="-rotate-8"
            />
          </Float>

          {/* Gọi thoại — nghiêng phải */}
          <Float
            amplitude={10}
            duration={5.6}
            delay={0.9}
            className="absolute top-[120px] left-[198px]"
          >
            <PhoneShot
              src="/phones/voice-call.png"
              alt="Màn hình cuộc gọi thoại trong ứng dụng Mindo"
              label="Gọi thoại"
              width={140}
              height={278}
              rotate="rotate-8"
            />
          </Float>

          {/* Gọi video — giữa, nổi lên trên */}
          <Float
            amplitude={13}
            duration={4.4}
            className="absolute top-[54px] left-[106px] z-10"
          >
            <PhoneShot
              src="/phones/video-call.png"
              alt="Màn hình gọi video HD trong ứng dụng Mindo"
              label="Gọi video"
              width={168}
              height={334}
              emphasis
            />
          </Float>
        </ScaledStage>
      </div>
    </Reveal>
  );
}

function PhoneShot({
  src,
  alt,
  label,
  width,
  height,
  rotate = "",
  emphasis = false,
}: {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
  rotate?: string;
  emphasis?: boolean;
}) {
  const radius = emphasis ? 32 : 28;
  const islandW = Math.round(width * 0.316);
  const islandH = Math.round(width * 0.094);

  return (
    <div className={`${rotate} flex flex-col items-center gap-2`}>
      <div
        className="relative overflow-hidden"
        style={{
          width,
          height,
          borderRadius: radius,
          boxShadow: emphasis
            ? "0 0 36px 0 rgb(125 211 252 / 0.18), 0 32px 72px 0 rgb(0 0 0 / 0.24)"
            : "0 20px 50px 0 rgb(0 0 0 / 0.18)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={393}
          height={852}
          sizes={`${width}px`}
          className="size-full object-cover object-top"
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black"
          style={{
            width: islandW,
            height: islandH,
            top: Math.round(width * 0.03),
          }}
        />
      </div>
      <span
        className={`text-[10px] leading-[14px] ${
          emphasis
            ? "font-semibold text-[#021c41]"
            : "font-medium text-slate-dim"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
