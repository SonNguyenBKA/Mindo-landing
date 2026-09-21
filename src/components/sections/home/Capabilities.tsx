import type { ComponentType } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarField } from "@/components/bg/StarField";
import { ShootingStars } from "@/components/bg/ShootingStars";
import { SignalRings } from "@/components/ui/SignalRings";
import { RevealItem, RevealStagger } from "@/components/motion/Reveal";
import {
  NewspaperIcon,
  PeerIcon,
  SparkleIcon,
  UsersIcon,
  VideoIcon,
  WalletIcon,
} from "@/components/ui/Icons";

type Capability = {
  title: string;
  desc: string;
  Icon: ComponentType<{ className?: string }>;
  /** Màu nhấn dạng `r g b` để dùng chung cho viền, bóng và vòng tín hiệu. */
  accent: string;
  /** Gradient của đĩa icon. */
  from: string;
  to: string;
};

const CAPABILITIES: Capability[] = [
  {
    title: "Trợ lý AI",
    desc: "Hỏi đáp, ảnh, tài liệu và dịch ngôn ngữ.",
    Icon: SparkleIcon,
    accent: "59 130 246",
    from: "#3b82f6",
    to: "#6366f1",
  },
  {
    title: "Mạng xã hội",
    desc: "Kết nối cộng đồng, chia sẻ và trò chuyện.",
    Icon: UsersIcon,
    accent: "168 85 247",
    from: "#a855f7",
    to: "#ec4899",
  },
  {
    title: "Tin tức",
    desc: "Cập nhật tin tức, thông tin thị trường.",
    Icon: NewspaperIcon,
    accent: "249 115 22",
    from: "#f97316",
    to: "#eab308",
  },
  {
    title: "Gọi thoại, video call",
    desc: "Gọi thoại và gọi video, có lịch sử cuộc gọi tra lại được.",
    Icon: VideoIcon,
    accent: "16 185 129",
    from: "#10b981",
    to: "#06b6d4",
  },
  {
    title: "Mindo Peer",
    desc: "Mở khoá quyền lợi trong ứng dụng, đồng thời là chứng nhận tài sản số.",
    Icon: PeerIcon,
    accent: "20 184 166",
    from: "#14b8a6",
    to: "#6366f1",
  },
  {
    title: "Bộ sưu tập Mindo",
    desc: "Quản lý và giao dịch an toàn trong một bộ sưu tập duy nhất.",
    Icon: WalletIcon,
    accent: "180 208 1",
    from: "#b4d001",
    to: "#22c55e",
  },
];

export function Capabilities() {
  return (
    <section
      id="tinh-nang"
      className="relative scroll-below-header overflow-hidden bg-mist py-20 lg:py-[76px]"
    >
      {/* Nền sao — màu ăn theo các thẻ năng lực */}
      {/*
        `dots={0}`: nền sáng chỉ dùng sao 4 cánh có màu, đúng như Figma.
        Chấm sao nhỏ màu xám trên nền trắng vừa giống hạt bụi, vừa tương phản
        quá thấp nên có nhấp nháy cũng không nhìn ra.
      */}
      <StarField seed={19} dots={0} sparkles={10} tone="light" />
      <ShootingStars
        seed={61}
        count={6}
        colors={["#a855f7", "#38bdf8", "#22c55e", "#6366f1"]}
      />

      {/* `relative` để nội dung nằm trên lớp sao nền */}
      <div className="relative container-mindo">
        <SectionHeading
          lines={["Một tài khoản, sáu năng lực"]}
          sub="Bốn năng lực hằng ngày, cộng thêm Mindo Peer và ví Mindo."
        />

        <RevealStagger
          from="up"
          stagger={0.08}
          delay={0.1}
          className="mt-13 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CAPABILITIES.map((c) => (
            <RevealItem key={c.title}>
              <CapabilityCard {...c} />
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

function CapabilityCard({ title, desc, Icon, accent, from, to }: Capability) {
  return (
    <article
      className="group relative h-full min-h-[210px] overflow-hidden rounded-[20px] border-[1.5px] p-6 transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor: `rgb(${accent} / 0.22)`,
        backgroundImage:
          "linear-gradient(162deg, #ffffff 23.6%, #f4f7fc 51.5%, #e8eef8 86.6%)",
        boxShadow: `0 2px 6px 0 rgb(2 28 65 / 0.05), 0 18px 38px -10px rgb(${accent} / 0.14)`,
      }}
    >
      <SignalRings color={`rgb(${accent})`} />

      <div className="relative">
        <span
          className="inline-flex size-12 items-center justify-center rounded-[14px] text-white transition-transform duration-300 group-hover:scale-105"
          style={{
            backgroundImage: `linear-gradient(135deg, ${from} 14.6%, ${to} 85.4%)`,
            filter: `drop-shadow(0 6px 9px rgb(${accent} / 0.35))`,
          }}
        >
          <Icon className="size-6" />
        </span>

        <h3 className="mt-5 text-[22px] leading-[30px] font-semibold text-[#021c41]">
          {title}
        </h3>
        <p className="mt-2 max-w-[318px] text-[15px] leading-6 text-slate-dim">
          {desc}
        </p>
      </div>
    </article>
  );
}
