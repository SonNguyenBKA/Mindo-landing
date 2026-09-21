import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * Các kiểu nút dùng trên trang. Mỗi section có một màu CTA riêng theo design,
 * nên gom hết vào đây thay vì viết lại gradient + bóng ở từng chỗ.
 */
type Variant =
  | "lime" // CTA chính (hero, tải app)
  | "lime-glow" // nút gửi biểu mẫu — quầng sáng toả đều quanh nút
  | "ghost-dark" // nút phụ trên nền tối
  | "violet" // CTA section Trợ lý AI
  | "amber"; // CTA section Tin tức

type Size = "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  lime: "bg-[linear-gradient(175deg,#b4d001_21%,#cfe24a_78%)] text-ink shadow-[0_12px_24px_0_rgb(180_208_1/0.4)] hover:shadow-[0_16px_34px_0_rgb(180_208_1/0.55)] hover:brightness-105",
  "lime-glow":
    "bg-[linear-gradient(90deg,#b4d001_14%,#cfe24a_85%)] text-ink shadow-[0_0_24px_0_rgb(180_208_1/0.4)] hover:shadow-[0_0_34px_0_rgb(180_208_1/0.55)] hover:brightness-105",
  "ghost-dark":
    "border border-haze/30 bg-haze/[0.07] text-snow hover:border-haze/50 hover:bg-haze/[0.12]",
  violet:
    "bg-[linear-gradient(167deg,#6366f1_14.6%,#818cf8_85.4%)] text-white shadow-[0_8px_20px_0_rgb(99_102_241/0.4)] hover:shadow-[0_12px_28px_0_rgb(99_102_241/0.55)] hover:brightness-110",
  amber:
    "bg-[linear-gradient(166deg,#f97316_14.6%,#eab308_85.4%)] text-white shadow-[0_8px_20px_0_rgb(249_115_22/0.35)] hover:shadow-[0_12px_28px_0_rgb(249_115_22/0.5)] hover:brightness-105",
};

const SIZES: Record<Size, string> = {
  md: "h-[50px] gap-2 rounded-[13px] px-6 text-[15px] leading-5",
  lg: "h-[54px] gap-2 rounded-[14px] px-7 text-[17px] leading-[22px]",
};

const BASE =
  "inline-flex items-center justify-center font-bold whitespace-nowrap transition-all duration-200 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime " +
  "active:translate-y-px";

type Shared = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

/** Nút dạng liên kết — dùng cho điều hướng và CTA. */
export function ButtonLink({
  children,
  href,
  variant = "lime",
  size = "lg",
  className = "",
  ...rest
}: Shared & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >) {
  const classes = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;

  // Link nội bộ đi qua next/link để được prefetch; link ngoài và mailto thì không.
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  if (isExternal) {
    const isHttp = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        target={isHttp ? "_blank" : undefined}
        rel={isHttp ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

/** Nút thật — dùng cho submit và các hành động. */
export function Button({
  children,
  variant = "lime",
  size = "lg",
  className = "",
  ...rest
}: Shared & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={`${BASE} ${SIZES[size]} ${VARIANTS[variant]} disabled:pointer-events-none disabled:opacity-70 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ---------- Icon nhỏ dùng trong nút ---------- */

export function ArrowRightIcon({
  className = "size-4",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function DownloadIcon({
  className = "size-[18px]",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 2v9M5.5 7.5 9 11l3.5-3.5M3 14.5h12" />
    </svg>
  );
}
