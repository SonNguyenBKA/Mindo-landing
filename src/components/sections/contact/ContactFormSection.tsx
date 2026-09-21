import { Badge } from "@/components/ui/Badge";
import { StarField } from "@/components/bg/StarField";
import { TechGrid } from "@/components/bg/TechGrid";
import { Glow } from "@/components/bg/Glow";
import { ShootingStars } from "@/components/bg/ShootingStars";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { MaskedLines } from "@/components/motion/MaskedLines";
import { Parallax } from "@/components/motion/Parallax";
import { ContactForm } from "./ContactForm";

const COMMITMENTS = [
  {
    title: "Giờ làm việc",
    body: "T2 – T7, 8:30 – 18:00 (GMT+7)",
    rgb: "180 208 1",
  },
  {
    title: "Kênh trả lời",
    body: "Qua chính địa chỉ email bạn điền trong biểu mẫu",
    rgb: "125 211 252",
  },
  {
    title: "Dữ liệu của bạn",
    body: "Chỉ dùng để xử lý yêu cầu này, không dùng cho mục đích khác",
    rgb: "129 140 248",
  },
];

export function ContactFormSection() {
  return (
    <section
      id="gui-tin-nhan"
      className="relative isolate scroll-below-header overflow-hidden bg-space py-20 lg:py-[119px]"
    >
      {/* ---------- Nền ---------- */}
      <TechGrid />
      <Parallax y={60} className="absolute inset-0">
        <Glow
          color="#6366f1"
          size={620}
          opacity={0.18}
          blur={120}
          className="top-20 left-[28%]"
        />
        <Glow
          color="#b4d001"
          size={460}
          opacity={0.14}
          blur={100}
          className="top-40 left-[34%]"
        />
        <Glow
          color="#1e6fd9"
          size={640}
          opacity={0.16}
          blur={120}
          className="top-30 left-[28%]"
        />
      </Parallax>
      <StarField seed={11} dots={66} sparkles={12} />
      <ShootingStars seed={43} count={4} />

      {/* ---------- Nội dung ---------- */}
      <div className="relative container-mindo">
        <div className="flex flex-col items-start gap-14 lg:flex-row lg:items-center lg:gap-16">
          {/* Cột chữ */}
          <div className="w-full lg:w-[470px] lg:shrink-0">
            <Reveal from="up" duration={0.7}>
              <Badge tone="violet">GỬI TIN NHẮN</Badge>
            </Reveal>

            <MaskedLines
              as="h2"
              delay={0.1}
              lines={["Viết thẳng cho", "đội ngũ phụ trách"]}
              className="mt-5 bg-[linear-gradient(90deg,#f2f6fb_0%,#818cf8_45%,#b4d001_100%)] bg-clip-text text-[clamp(2rem,5vw,2.875rem)] leading-[1.15] font-bold tracking-[-0.01em] text-transparent"
            />

            <Reveal
              as="p"
              from="up"
              delay={0.26}
              className="mt-5 max-w-[440px] text-[16px] leading-7 text-haze"
            >
              {/*
                Biểu mẫu nằm bên phải ở desktop nhưng xuống dưới ở mobile,
                nên chỉ từ chữ này mới đổi theo bố cục.
              */}
              Điền biểu mẫu <span className="lg:hidden">bên dưới</span>
              <span className="hidden lg:inline">bên cạnh</span>. Chọn đúng chủ
              đề để yêu cầu về thẳng nhóm xử lý, không qua bước phân loại thủ
              công.
            </Reveal>

            <RevealStagger
              as="ul"
              from="up"
              delay={0.34}
              stagger={0.1}
              className="mt-9 flex flex-col gap-3"
            >
              {COMMITMENTS.map((c) => (
                <RevealItem key={c.title} as="li">
                  <div
                    className="flex flex-col gap-1 rounded-xl border px-4 py-3.5"
                    style={{
                      backgroundColor: `rgb(${c.rgb} / 0.1)`,
                      borderColor: `rgb(${c.rgb} / 0.25)`,
                    }}
                  >
                    <span
                      className="text-[13px] leading-[18px] font-semibold"
                      style={{ color: `rgb(${c.rgb})` }}
                    >
                      {c.title}
                    </span>
                    <span className="text-[14px] leading-[22px] text-haze">
                      {c.body}
                    </span>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>

          {/* Biểu mẫu */}
          <Reveal
            from="right"
            delay={0.2}
            duration={1}
            className="w-full lg:flex-1"
          >
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
