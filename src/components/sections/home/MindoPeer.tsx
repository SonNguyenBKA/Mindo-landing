import { Badge, SparkStar } from "@/components/ui/Badge";
import { LogoMark } from "@/components/ui/Logo";
import { StarField } from "@/components/bg/StarField";
import { ShootingStars } from "@/components/bg/ShootingStars";
import { TechGrid } from "@/components/bg/TechGrid";
import { Glow } from "@/components/bg/Glow";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { MaskedLines } from "@/components/motion/MaskedLines";
import { Float } from "@/components/motion/Float";
import { ScaledStage } from "@/components/ui/ScaledStage";
import { Parallax } from "@/components/motion/Parallax";

const BENEFITS = [
  { label: "Số seri duy nhất cho mỗi bản", rgb: "180 208 1" },
  { label: "Ghi nhận sở hữu công khai", rgb: "34 197 94" },
  { label: "Xác thực bằng eKYC", rgb: "6 182 212" },
];

export function MindoPeer() {
  return (
    <section
      id="mindo-peer"
      className="relative isolate scroll-below-header overflow-hidden bg-space py-20 lg:py-[90px]"
    >
      {/* ---------- Nền ---------- */}
      <TechGrid />
      <Parallax y={55} className="absolute inset-0">
        <Glow
          color="#b4d001"
          size={500}
          opacity={0.18}
          blur={110}
          className="-top-20 left-[69%]"
        />
        <Glow
          color="#6366f1"
          size={400}
          opacity={0.18}
          blur={100}
          className="top-12 left-[20%]"
        />
      </Parallax>
      <StarField seed={57} dots={70} sparkles={14} />
      <ShootingStars seed={29} count={5} />

      {/* ---------- Nội dung ---------- */}
      <div className="relative container-mindo">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:items-center lg:gap-16">
          <PeerCards />

          {/* Cột chữ */}
          <div className="flex w-full max-w-xl flex-col items-start lg:flex-1">
            <Reveal from="up" duration={0.7}>
              <Badge tone="lime" icon={<SparkStar />}>
                MINDO PEER
              </Badge>
            </Reveal>

            <MaskedLines
              as="h2"
              delay={0.1}
              lines={["Sở hữu thực sự", "không trung gian"]}
              className="mt-5 bg-[linear-gradient(90deg,#f2f6fb_0%,#b4d001_55%,#22c55e_100%)] bg-clip-text text-[clamp(2rem,5vw,2.875rem)] leading-[1.15] font-bold tracking-[-0.01em] text-transparent"
            />

            <Reveal
              as="p"
              from="up"
              delay={0.26}
              className="mt-5 max-w-[480px] text-[17px] leading-[1.75] text-haze"
            >
              Peer là vật phẩm số do Mindo phát hành, mỗi bản mang một số seri
              riêng và chủ sở hữu được ghi nhận công khai.
            </Reveal>

            <RevealStagger
              as="ul"
              from="up"
              delay={0.34}
              stagger={0.1}
              className="mt-10 flex flex-col gap-4"
            >
              {BENEFITS.map((b) => (
                <RevealItem
                  key={b.label}
                  as="li"
                  className="flex items-center gap-3"
                >
                  <span
                    className="inline-flex size-6 shrink-0 items-center justify-center rounded-full border"
                    style={{
                      backgroundColor: `rgb(${b.rgb} / 0.12)`,
                      borderColor: `rgb(${b.rgb} / 0.3)`,
                      color: `rgb(${b.rgb})`,
                    }}
                  >
                    <svg
                      viewBox="0 0 10 8"
                      className="h-2 w-2.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m1 4 2.6 2.6L9 1.2" />
                    </svg>
                  </span>
                  <span className="text-[15px] leading-[22px] font-medium text-snow">
                    {b.label}
                  </span>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Hai thẻ Peer xếp chéo, lệch tầng và trôi lệch pha nhau. */
function PeerCards() {
  return (
    <Reveal
      from="none"
      scale={0.92}
      duration={1.1}
      className="w-full lg:w-auto lg:shrink-0"
    >
      <div className="flex justify-center">
        <ScaledStage
          width={340}
          height={440}
          className="[--stage-scale:0.78] sm:[--stage-scale:0.92] lg:[--stage-scale:1]"
        >
          {/* Thẻ sau — #142 */}
          <Float
            amplitude={11}
            duration={5.2}
            className="absolute top-[-18px] left-0"
          >
            <PeerCard
              serial="Mindo Genesis #142"
              rotate="-rotate-5"
              size="sm"
            />
          </Float>

          {/* Thẻ trước — #001 */}
          <Float
            amplitude={14}
            duration={4.4}
            delay={0.7}
            className="absolute top-[204px] left-[114px] z-10"
          >
            <PeerCard serial="Mindo Genesis #001" rotate="rotate-4" size="lg" />
          </Float>
        </ScaledStage>
      </div>
    </Reveal>
  );
}

function PeerCard({
  serial,
  rotate,
  size,
}: {
  serial: string;
  rotate: string;
  size: "sm" | "lg";
}) {
  const isLg = size === "lg";

  return (
    <article
      className={`${rotate} flex w-[210px] flex-col items-start rounded-[20px] bg-white p-4 ${
        isLg
          ? "border border-lime/30 shadow-[0_0_28px_0_rgb(180_208_1/0.12),0_24px_60px_0_rgb(0_0_0/0.2)]"
          : "shadow-[0_20px_50px_0_rgb(0_0_0/0.18)]"
      }`}
    >
      {/* Ảnh Peer */}
      <div
        className={`flex w-full items-center justify-center overflow-hidden bg-mist ${
          isLg ? "h-35 rounded-[14px]" : "h-[130px] rounded-xl"
        }`}
      >
        <LogoMark size={isLg ? 96 : 80} shape="squircle" />
      </div>

      <p
        className={`font-bold text-[#021c41] ${
          isLg
            ? "mt-4 text-[13px] leading-[18px]"
            : "mt-3 text-[12px] leading-[17px]"
        }`}
      >
        {serial}
      </p>

      <div className="mt-2 flex items-center gap-1.5">
        <LogoMark size={isLg ? 20 : 16} />
        <span
          className={`text-slate-dim ${
            isLg ? "text-[11px] leading-4" : "text-[10px] leading-[15px]"
          }`}
        >
          Mindo Official
        </span>
      </div>
    </article>
  );
}
