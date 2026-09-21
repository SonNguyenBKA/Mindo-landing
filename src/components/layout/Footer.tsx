import Link from "next/link";
import { LogoMark } from "@/components/ui/Logo";
import { StarField } from "@/components/bg/StarField";
import { ShootingStars } from "@/components/bg/ShootingStars";
import { Nebula } from "@/components/bg/Glow";
import { AppStoreIcon, GooglePlayIcon } from "@/components/ui/StoreIcons";
import {
  FacebookIcon,
  TiktokIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";

const COLUMNS = [
  {
    title: "SẢN PHẨM",
    links: [
      { label: "Trợ lý AI", href: "/#tro-ly-ai" },
      { label: "Mạng xã hội", href: "/#tinh-nang" },
      { label: "Mindo Peer", href: "/#mindo-peer" },
      { label: "Bộ sưu tập Mindo", href: "/#tinh-nang" },
      { label: "Tin tức", href: "/#tin-tuc" },
    ],
  },
  {
    title: "CÔNG TY",
    links: [
      { label: "Về chúng tôi", href: "/#tinh-nang" },
      { label: "Blog", href: "/#tin-tuc" },
    ],
  },
  {
    title: "HỖ TRỢ",
    links: [
      { label: "Trung tâm trợ giúp", href: "/lien-he" },
      { label: "Liên hệ", href: "/lien-he" },
      { label: "Điều khoản", href: "/lien-he" },
      { label: "Chính sách", href: "/lien-he" },
    ],
  },
];

const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com", Icon: FacebookIcon },
  { label: "X (Twitter)", href: "https://x.com", Icon: XIcon },
  { label: "YouTube", href: "https://youtube.com", Icon: YoutubeIcon },
  { label: "TikTok", href: "https://tiktok.com", Icon: TiktokIcon },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/[0.06] bg-space-deep">
      {/* Nền vũ trụ */}
      <StarField seed={91} dots={46} sparkles={9} />
      <ShootingStars seed={23} count={4} />
      <Nebula
        color="#b4d001"
        size={520}
        opacity={0.16}
        className="-top-56 -right-24"
      />
      <Nebula
        color="#1d4ed8"
        coreColor="#60a5fa"
        size={460}
        opacity={0.14}
        className="-bottom-24 -left-32"
      />

      <div className="relative container-mindo pt-10 pb-8 sm:pt-14">
        {/* Lưới cột */}
        <div className="flex flex-col gap-8 sm:gap-10 md:flex-row">
          {/* Cột thương hiệu */}
          <div className="md:w-[36%] md:shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex size-9 items-center justify-center rounded-[10px] border border-lime/20 bg-gradient-to-br from-[#0b2e5c] to-[#04122a]">
                <LogoMark size={28} />
              </span>
              <span className="text-[20px] leading-6 font-bold text-white">
                Mindo
              </span>
            </div>

            <p className="mt-5 max-w-60 text-[14px] leading-[25px] text-[#4e6580]">
              Nền tảng kết hợp AI, mạng xã hội, tin tức và Mindo Peer trong một
              ứng dụng duy nhất.
            </p>

            <ul className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex size-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.06] text-[#8296ad] transition-colors hover:border-lime/40 hover:bg-lime/10 hover:text-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime sm:size-8"
                  >
                    <Icon className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột liên kết */}
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
            <LinkColumn {...COLUMNS[0]} />

            {/*
              Mobile chỉ đủ chỗ cho 2 cột. Nếu để lưới tự xếp 3 cột vào 2 chỗ
              thì "HỖ TRỢ" bị đẩy xuống một hàng riêng và bỏ trống hẳn khoảng
              bên phải nó — footer cao quá viewport, khối thương hiệu ở trên
              không còn nhìn thấy được.

              Nên gộp hai cột ngắn vào cột phải. Từ `sm` trở lên, `contents`
              làm lớp bọc này biến mất khỏi layout để ba cột trở lại nằm ngang
              như một lưới 3 cột bình thường.
            */}
            <div className="flex flex-col gap-8 sm:contents">
              <LinkColumn {...COLUMNS[1]} />
              <LinkColumn {...COLUMNS[2]} />
            </div>
          </div>
        </div>

        {/* Tải ứng dụng */}
        <div
          id="tai-app"
          className="mt-10 border-b border-white/[0.06] pb-8 scroll-below-header sm:mt-12 sm:pb-10"
        >
          <p className="text-[12px] leading-4 tracking-[0.1em] text-[#4e6580]">
            TẢI ỨNG DỤNG
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <StoreButton
              href="https://apps.apple.com"
              kicker="Download on the"
              name="App Store"
              icon={<AppStoreIcon className="h-[22px] w-[18px]" />}
            />
            <StoreButton
              href="https://play.google.com"
              kicker="GET IT ON"
              name="Google Play"
              icon={<GooglePlayIcon className="h-5 w-[18px]" />}
            />
          </div>
        </div>

        {/* Dòng đáy */}
        <div className="mt-8 sm:mt-10">
          <p className="text-[13px] leading-[18px] text-[#344d63]">
            © 2026 Mindo Technology JSC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function LinkColumn({ title, links }: (typeof COLUMNS)[number]) {
  return (
    <div>
      <h3 className="bg-gradient-to-r from-haze to-slate-dim bg-clip-text text-[12px] leading-[17px] font-semibold tracking-[0.1em] text-transparent">
        {title}
      </h3>
      <ul className="mt-5 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              // `py-1.5 -my-1.5` nới vùng chạm lên ~32px cho ngón tay
              // mà không làm giãn khoảng cách giữa các dòng
              className="-my-1.5 inline-block py-1.5 text-[14px] leading-5 text-[#4e6580] transition-colors hover:text-haze"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
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
      className="inline-flex h-[46px] items-center gap-3 rounded-[10px] border border-white/10 bg-white/[0.06] px-4 transition-colors hover:border-lime/30 hover:bg-white/[0.1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
    >
      <span className="shrink-0 text-white">{icon}</span>
      <span className="flex flex-col items-start gap-0.5">
        <span className="text-[9px] leading-3 text-slate-dim">{kicker}</span>
        <span className="text-[14px] leading-[18px] font-semibold text-white">
          {name}
        </span>
      </span>
    </a>
  );
}
