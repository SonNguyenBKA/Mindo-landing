import { LogoMark } from "@/components/ui/Logo";
import { StarField } from "@/components/bg/StarField";
import { ShootingStars } from "@/components/bg/ShootingStars";
import { TechGrid } from "@/components/bg/TechGrid";
import { Glow } from "@/components/bg/Glow";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { MaskedLines } from "@/components/motion/MaskedLines";
import { Float } from "@/components/motion/Float";
import { Parallax } from "@/components/motion/Parallax";
import { CountUp } from "@/components/motion/CountUp";
import { AppStoreIcon, GooglePlayIcon } from "@/components/ui/StoreIcons";

const PROOF = [
  { value: 2, suffix: "M+", decimals: 0, label: "Người dùng" },
  { value: 4.9, suffix: "★", decimals: 1, label: "App Store" },
  { value: 4.8, suffix: "★", decimals: 1, label: "Google Play" },
];

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-space py-20 lg:py-[128px]">
      {/* ---------- Nền ---------- */}
      <TechGrid />
      <Parallax y={70} className="absolute inset-0">
        <Glow
          color="#1e6fd9"
          size="800px"
          opacity={0.16}
          blur={130}
          className="top-[156px] left-1/2 h-[400px] -translate-x-1/2 rounded-[50%]"
        />
        <Glow
          color="#b4d001"
          size={700}
          opacity={0.14}
          blur={130}
          className="-top-50 left-[62%]"
        />
      </Parallax>
      <StarField seed={97} dots={78} sparkles={15} />
      <ShootingStars seed={13} count={6} />

      {/* ---------- Nội dung ---------- */}
      <div className="relative container-mindo">
        <div className="flex flex-col items-center text-center">
          {/* Ô logo */}
          <Reveal from="none" scale={0.8} duration={0.9}>
            <Float amplitude={9} duration={4.8}>
              <span className="inline-flex size-20 items-center justify-center rounded-[20px] border border-lime/20 bg-[linear-gradient(135deg,#0b2e5c_14.6%,#04122a_85.4%)] shadow-[0_0_32px_0_rgb(180_208_1/0.12)]">
                <LogoMark size={56} />
              </span>
            </Float>
          </Reveal>

          <MaskedLines
            as="h2"
            delay={0.14}
            lines={["Sẵn sàng trải nghiệm", "Mindo?"]}
            className="mt-8 bg-[linear-gradient(90deg,#f2f6fb_0%,#b4d001_55%,#7dd3fc_100%)] bg-clip-text text-[clamp(2.125rem,5.6vw,3.25rem)] leading-[1.12] font-bold tracking-[-0.01em] text-transparent"
          />

          <Reveal
            as="p"
            from="up"
            delay={0.3}
            className="mt-5 max-w-[600px] text-[17px] leading-[1.75] text-[#7a92b0]"
          >
            Khám phá AI, sở hữu Mindo Peer — thay đổi cuộc sống mỗi ngày
          </Reveal>

          <Reveal
            from="up"
            delay={0.4}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <StoreButton
              href="https://apps.apple.com"
              kicker="Download on the"
              name="App Store"
              icon={<AppStoreIcon className="h-[27px] w-[20px]" />}
            />
            <StoreButton
              href="https://play.google.com"
              kicker="GET IT ON"
              name="Google Play"
              icon={<GooglePlayIcon className="h-6 w-[22px]" />}
            />
          </Reveal>

          <RevealStagger
            from="up"
            delay={0.5}
            stagger={0.1}
            className="mt-14 flex flex-wrap items-center justify-center gap-6"
          >
            {PROOF.map((p) => (
              <RevealItem
                key={p.label}
                as="span"
                className="flex items-center gap-2"
              >
                <span className="text-[18px] leading-6 font-bold text-white">
                  <CountUp
                    value={p.value}
                    suffix={p.suffix}
                    decimals={p.decimals}
                  />
                </span>
                <span className="text-[13px] leading-[18px] text-slate-dim">
                  {p.label}
                </span>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}

function StoreButton({
  href,
  kicker,
  name,
  icon,
}: {
  href: string;
  kicker: string;
  name: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-[58px] min-w-45 items-center justify-center gap-3 rounded-[14px] border border-white/15 bg-black px-6 transition-all duration-200 hover:border-lime/40 hover:shadow-[0_10px_30px_0_rgb(180_208_1/0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
    >
      <span className="shrink-0 text-white">{icon}</span>
      <span className="flex flex-col items-center gap-0.5 text-white">
        <span className="text-[10px] leading-[13px] opacity-80">{kicker}</span>
        <span className="text-[19px] leading-[22px] font-semibold whitespace-nowrap">
          {name}
        </span>
      </span>
    </a>
  );
}
