import type { ComponentType } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SignalRings } from "@/components/ui/SignalRings";
import { Glow } from "@/components/bg/Glow";
import { StarField } from "@/components/bg/StarField";
import { ShootingStars } from "@/components/bg/ShootingStars";
import { RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { MailIcon, PeerIcon } from "@/components/ui/Icons";

type Channel = {
  title: string;
  desc: string;
  email: string;
  Icon: ComponentType<{ className?: string }>;
  /** Màu nhấn dạng `r g b`. */
  accent: string;
  from: string;
  to: string;
};

const CHANNELS: Channel[] = [
  {
    title: "Hỗ trợ tài khoản",
    desc: "Đăng nhập, xác minh, ví Mindo và lịch sử giao dịch.",
    email: "hotro@mindo.vn",
    Icon: MailIcon,
    accent: "59 130 246",
    from: "#3b82f6",
    to: "#6366f1",
  },
  {
    title: "Mindo Peer & đại lý",
    desc: "Sở hữu Mindo Peer, giá sau chiết khấu đại lý, tra cứu số seri từng bản.",
    email: "peer@mindo.vn",
    Icon: PeerIcon,
    accent: "20 184 166",
    from: "#14b8a6",
    to: "#6366f1",
  },
];

export function ContactChannels() {
  return (
    <section className="relative overflow-hidden bg-mist py-20 lg:py-[94px]">
      {/* Nền sao — màu ăn theo hai thẻ kênh (lam + xanh ngọc) */}
      {/*
        `dots={0}`: nền sáng chỉ dùng sao 4 cánh có màu, đúng như Figma.
        Chấm sao nhỏ màu xám trên nền trắng vừa giống hạt bụi, vừa tương phản
        quá thấp nên có nhấp nháy cũng không nhìn ra.
      */}
      <StarField seed={29} dots={0} sparkles={9} tone="light" />
      <ShootingStars
        seed={47}
        count={3}
        colors={["#3b82f6", "#14b8a6", "#a855f7"]}
      />

      <Glow
        color="#3b82f6"
        size={420}
        opacity={0.1}
        blur={100}
        className="top-[120px] left-[35%]"
      />
      <Glow
        color="#b4d001"
        size={340}
        opacity={0.12}
        blur={90}
        className="top-[260px] left-[38%]"
      />

      <div className="relative container-mindo">
        <SectionHeading
          lines={["Hai kênh, hai nhóm phụ trách"]}
          sub="Gửi đúng kênh thì nội dung tới thẳng người xử lý, không phải chờ chuyển tiếp nội bộ."
        />

        <RevealStagger
          from="up"
          stagger={0.12}
          delay={0.12}
          className="mx-auto mt-12 grid max-w-[940px] gap-5 md:grid-cols-2"
        >
          {CHANNELS.map((c) => (
            <RevealItem key={c.title}>
              <ChannelCard {...c} />
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

function ChannelCard({ title, desc, email, Icon, accent, from, to }: Channel) {
  return (
    <article
      className="group relative flex h-full min-h-[252px] flex-col overflow-hidden rounded-[20px] border-[1.5px] p-6.5 transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor: `rgb(${accent} / 0.22)`,
        backgroundImage:
          "linear-gradient(162deg, #ffffff 23.6%, #f4f7fc 51.5%, #e8eef8 86.6%)",
        boxShadow: `0 2px 6px 0 rgb(2 28 65 / 0.05), 0 18px 38px -10px rgb(${accent} / 0.14)`,
      }}
    >
      <SignalRings color={`rgb(${accent})`} corner="tl" />

      <div className="relative flex flex-1 flex-col">
        <span
          className="inline-flex size-12 items-center justify-center rounded-[14px] text-white transition-transform duration-300 group-hover:scale-105"
          style={{
            backgroundImage: `linear-gradient(90deg, ${from}, ${to})`,
            filter: `drop-shadow(0 6px 9px rgb(${accent} / 0.35))`,
          }}
        >
          <Icon className="size-6" />
        </span>

        <h3 className="mt-5 text-[22px] leading-[30px] font-semibold text-[#021c41]">
          {title}
        </h3>
        <p className="mt-2 max-w-[380px] text-[15px] leading-6 text-slate-dim">
          {desc}
        </p>

        <a
          href={`mailto:${email}`}
          className="mt-auto inline-flex w-fit items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[14px] leading-5 font-semibold text-[#021c41] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
          style={{
            backgroundColor: `rgb(${accent} / 0.1)`,
            borderColor: `rgb(${accent} / 0.28)`,
          }}
        >
          <span
            className="size-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: `rgb(${accent})` }}
          />
          {email}
        </a>
      </div>
    </article>
  );
}
