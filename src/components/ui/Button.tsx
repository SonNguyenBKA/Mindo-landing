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
  lime: "bg-lime-soft text-ink hover:bg-lime",
  "lime-glow": "bg-lime-soft text-ink hover:bg-lime",
  "ghost-dark":
    "border border-haze/30 bg-haze/[0.07] text-snow hover:border-haze/50 hover:bg-haze/[0.12]",
  violet: "bg-lime-soft text-ink hover:bg-lime",
  amber: "bg-ink text-white hover:bg-space",
};

const SIZES: Record<Size, string> = {
  md: "h-[48px] gap-3 rounded-full px-6 text-[14px] leading-5",
  lg: "h-[54px] gap-3 rounded-full px-7 text-[15px] leading-[22px]",
};

const BASE =
  "inline-flex items-center justify-center font-semibold whitespace-nowrap transition-[background-color,color,transform] duration-200 " +
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

  // Native fragment links preserve CSS smooth scrolling.
  if (href.startsWith("#")) {
    return <a href={href} className={classes}>{children}</a>;
  }

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
