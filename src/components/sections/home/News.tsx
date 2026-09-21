import Image from "next/image";
import { Glow } from "@/components/bg/Glow";
import { StarField } from "@/components/bg/StarField";
import { ShootingStars } from "@/components/bg/ShootingStars";
import { Badge, SparkStar } from "@/components/ui/Badge";
import { ArrowRightIcon, ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { MaskedLines } from "@/components/motion/MaskedLines";
import { Parallax } from "@/components/motion/Parallax";
import { CountUp } from "@/components/motion/CountUp";
import { Sparkline } from "@/components/ui/Sparkline";

/** Chip lĩnh vực tin — mỗi lĩnh vực một màu. */
const TOPICS = [
  { label: "Chứng khoán", rgb: "59 130 246" },
  { label: "Crypto", rgb: "249 115 22" },
  { label: "Ngoại hối & hàng hóa", rgb: "6 182 212" },
  { label: "Kinh tế vĩ mô realtime", rgb: "168 85 247" },
];

/** Bảng giá realtime trong thẻ nhỏ. */
const TICKERS = [
  {
    code: "VNM",
    value: "1.287",
    change: "+1.2%",
    up: true,
    points: [3, 8, 6, 11, 9, 14, 13, 18],
  },
  {
    code: "BTC",
    value: "67.4K",
    change: "+2.8%",
    up: true,
    points: [5, 4, 9, 7, 12, 11, 16, 19],
  },
  {
    code: "HPG",
    value: "26.3",
    change: "-0.5%",
    up: false,
    points: [16, 17, 13, 14, 10, 11, 7, 5],
  },
];

export function News() {
  return (
    <section
      id="tin-tuc"
      className="relative scroll-below-header overflow-hidden bg-mist py-20 lg:py-[82px]"
    >
      {/* Nền sao — màu ăn theo tông cam của section tin tức */}
      {/*
        `dots={0}`: nền sáng chỉ dùng sao 4 cánh có màu, đúng như Figma.
        Chấm sao nhỏ màu xám trên nền trắng vừa giống hạt bụi, vừa tương phản
        quá thấp nên có nhấp nháy cũng không nhìn ra.
      */}
      <StarField seed={37} dots={0} sparkles={10} tone="light" />
      <ShootingStars
        seed={53}
        count={6}
        colors={["#f97316", "#a855f7", "#06b6d4", "#eab308"]}
      />

      {/* Quầng sáng nền */}
      <Parallax y={50} className="absolute inset-0">
        <Glow
          color="#f97316"
          size={400}
          opacity={0.13}
          blur={100}
          className="top-[68px] left-[5%]"
        />
        <Glow
          color="#eab308"
          size={300}
          opacity={0.14}
          blur={90}
          className="top-[346px] left-[71%]"
        />
      </Parallax>

      <div className="relative container-mindo">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Cột chữ */}
          <div className="flex w-full max-w-xl flex-col items-start lg:flex-1">
            <Reveal from="up" duration={0.7}>
              <Badge tone="amber" icon={<SparkStar />}>
                TIN TỨC THỊ TRƯỜNG
              </Badge>
            </Reveal>

            <MaskedLines
              as="h2"
              delay={0.1}
              lines={["Thị trường trong", "tầm tay bạn"]}
              className="mt-5 bg-[linear-gradient(90deg,#021c41_0%,#f97316_50%,#eab308_100%)] bg-clip-text text-[clamp(2rem,5vw,2.875rem)] leading-[1.15] font-bold tracking-[-0.01em] text-transparent"
            />

            <Reveal
              as="p"
              from="up"
              delay={0.26}
              className="mt-5 max-w-[460px] text-[16px] leading-7 text-slate-dim"
            >
              Tin tức tài chính, chứng khoán, crypto và công nghệ — được tổng
              hợp realtime và cá nhân hóa theo sở thích của bạn.
            </Reveal>

            <RevealStagger
              from="up"
              delay={0.3}
              stagger={0.05}
              className="mt-8 flex max-w-[560px] flex-wrap gap-2"
            >
              {TOPICS.map((t) => (
                <RevealItem key={t.label} as="span">
                  <span
                    className="inline-flex items-center rounded-full border px-3 py-1 text-[13px] leading-[18px] font-semibold"
                    style={{
                      color: `rgb(${t.rgb})`,
                      borderColor: `rgb(${t.rgb} / 0.2)`,
                      backgroundColor: `rgb(${t.rgb} / 0.06)`,
                    }}
                  >
                    {t.label}
                  </span>
                </RevealItem>
              ))}
            </RevealStagger>

            <RevealStagger
              from="up"
              delay={0.36}
              stagger={0.08}
              className="mt-8 flex items-start gap-8"
            >
              <RevealItem className="flex flex-col gap-0.5">
                <span className="text-[22px] leading-7 font-bold text-[#021c41]">
                  <CountUp value={500} suffix="+" />
                </span>
                <span className="text-[12px] leading-4 text-haze">
                  Nguồn tin
                </span>
              </RevealItem>
              <RevealItem className="flex flex-col gap-0.5">
                <span className="text-[22px] leading-7 font-bold text-[#021c41]">
                  Realtime
                </span>
                <span className="text-[12px] leading-4 text-haze">
                  Cập nhật
                </span>
              </RevealItem>
              <RevealItem className="flex flex-col gap-0.5">
                <span className="text-[22px] leading-7 font-bold text-[#021c41]">
                  AI
                </span>
                <span className="text-[12px] leading-4 text-haze">Tóm tắt</span>
              </RevealItem>
            </RevealStagger>

            <Reveal from="up" delay={0.46} className="mt-8">
              <ButtonLink href="/#tai-app" variant="amber" size="md">
                Khám phá tin tức
                <ArrowRightIcon className="size-3.5" />
              </ButtonLink>
            </Reveal>
          </div>

          {/* Cụm thẻ tin */}
          <Reveal
            from="left"
            delay={0.15}
            duration={1}
            className="w-full lg:w-[380px] lg:shrink-0"
          >
            <div className="flex flex-col gap-3">
              {/* Thẻ tin nổi bật */}
              <article className="group overflow-hidden rounded-[20px] border border-[#e9edf2] bg-white shadow-[0_4px_12px_0_rgb(2_28_65/0.08)] transition-shadow duration-300 hover:shadow-[0_10px_28px_0_rgb(2_28_65/0.14)]">
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src="/news/news-1.jpg"
                    alt="Toà nhà văn phòng — minh hoạ tin chứng khoán"
                    width={690}
                    height={368}
                    sizes="380px"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-[linear-gradient(151deg,#f97316_14.6%,#eab308_85.4%)] px-2.5 py-1 text-[11px] leading-4 font-semibold text-white">
                    HOT
                  </span>
                  <span className="absolute top-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] leading-4 font-semibold text-[#f5f5f5] backdrop-blur-sm">
                    Thị trường
                  </span>
                </div>
                <div className="flex flex-col gap-2 p-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#fff7ed] px-2 py-0.5 text-[11px] leading-4 font-semibold text-[#f97316]">
                      Chứng khoán
                    </span>
                    <span className="text-[11px] leading-[15px] text-haze">
                      2 giờ trước
                    </span>
                  </div>
                  <h3 className="text-[15px] leading-[21px] font-bold text-[#021c41]">
                    VN-Index tăng mạnh nhờ dòng tiền khối ngoại quay trở lại
                  </h3>
                </div>
              </article>

              {/* Hàng thẻ nhỏ */}
              <div className="flex gap-3">
                <article className="group flex flex-1 flex-col overflow-hidden rounded-2xl border border-[#e9edf2] bg-white shadow-[0_2px_6px_0_rgb(2_28_65/0.06)] transition-shadow duration-300 hover:shadow-[0_8px_20px_0_rgb(2_28_65/0.12)]">
                  <div className="relative h-[90px] w-full overflow-hidden">
                    <Image
                      src="/news/news-2.jpg"
                      alt="Toà nhà cao tầng — minh hoạ tin công nghệ"
                      width={240}
                      height={240}
                      sizes="184px"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-2 left-2 rounded-full bg-[rgb(6_182_212/0.85)] px-2 py-0.5 text-[10px] leading-[15px] font-semibold text-white">
                      Công nghệ
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="text-[12px] leading-[17px] font-bold text-[#021c41]">
                      AI và NFT — tương lai tài sản số
                    </h3>
                  </div>
                </article>

                {/* Bảng realtime */}
                <div className="flex flex-1 flex-col gap-3 rounded-2xl border border-[#e9edf2] bg-white p-3">
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-[#22c55e]" />
                    <span className="text-[10px] leading-[14px] font-bold tracking-[0.08em] text-[#22c55e]">
                      REALTIME
                    </span>
                  </div>
                  {TICKERS.map((t) => (
                    <div
                      key={t.code}
                      className="flex items-center justify-between gap-1"
                    >
                      <span className="flex flex-col gap-0.5">
                        <span className="text-[11px] leading-[13px] font-bold text-[#021c41]">
                          {t.code}
                        </span>
                        <span className="text-[9px] leading-[11px] text-haze">
                          {t.value}
                        </span>
                      </span>
                      <Sparkline
                        points={t.points}
                        up={t.up}
                        className="h-[22px] w-11 shrink-0"
                      />
                      <span
                        className={`text-[11px] leading-[15px] font-bold ${
                          t.up ? "text-[#22c55e]" : "text-[#ef4444]"
                        }`}
                      >
                        {t.change}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
