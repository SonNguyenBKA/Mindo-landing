import type { ReactNode } from "react";

/** Mỗi section mở đầu bằng một badge mang màu riêng của section đó. */
type Tone = "lime" | "violet" | "amber" | "blue";

type Size = "sm" | "md";

const TONES: Record<Tone, { wrap: string; dot: string }> = {
  lime: { wrap: "border-lime/30 bg-lime/[0.07] text-lime", dot: "bg-lime" },
  violet: {
    wrap: "border-accent-violet/35 bg-accent-violet/10 text-[#818cf8]",
    dot: "bg-[#818cf8]",
  },
  amber: {
    wrap: "border-accent-amber/30 bg-accent-amber/[0.07] text-[#f97316]",
    dot: "bg-[#f97316]",
  },
  blue: {
    wrap: "border-[#1e6fd9]/20 bg-[#1e6fd9]/[0.06] text-[#1e6fd9]",
    dot: "bg-[#1e6fd9]",
  },
};

const SIZES: Record<Size, string> = {
  sm: "text-[11px] leading-[15px] tracking-[0.14em]",
  md: "text-[12px] leading-4 tracking-[0.05em]",
};

type BadgeProps = {
  children: ReactNode;
  tone?: Tone;
  size?: Size;
  /**
   * Icon đứng trước chữ. Bỏ trống thì dùng một chấm tròn;
   * truyền `null` thì không hiện gì.
   */
  icon?: ReactNode | null;
  className?: string;
};

/** Nhãn nhỏ bo tròn, chữ in hoa giãn chữ — mở đầu cho mỗi section. */
export function Badge({
  children,
  tone = "lime",
  size = "md",
  icon,
  className = "",
}: BadgeProps) {
  const t = TONES[tone];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-semibold ${SIZES[size]} ${t.wrap} ${className}`}
    >
      {icon === undefined ? (
        <span className={`size-1.5 shrink-0 rounded-full ${t.dot}`} />
      ) : (
        icon
      )}
      {children}
    </span>
  );
}

/** Sao 4 cánh — hay dùng làm icon mở đầu badge. */
export function SparkStar({ className = "size-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0c.7 6.3 4.9 10.6 12 12-7.1 1.4-11.3 5.7-12 12-.7-6.3-4.9-10.6-12-12C7.1 10.6 11.3 6.3 12 0Z" />
    </svg>
  );
}
