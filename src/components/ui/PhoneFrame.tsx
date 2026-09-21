import Image from "next/image";

/** Tỉ lệ khung máy (khớp ảnh chụp màn hình 393×852 xuất từ Figma). */
const ASPECT = 852 / 393;

type PhoneFrameProps = {
  src: string;
  alt: string;
  /** Chiều rộng khung máy (px). Mọi thông số khác suy ra từ đây. */
  width: number;
  /** Cường độ quầng sáng lime quanh máy: 0 = tắt. */
  glow?: number;
  /** Màu quầng sáng. */
  glowColor?: string;
  /** Độ đậm của bóng đổ. */
  shadow?: "md" | "lg";
  /** Ưu tiên tải (dùng cho ảnh trong hero). */
  priority?: boolean;
  className?: string;
};

/**
 * Khung điện thoại bọc ảnh chụp màn hình app.
 *
 * Bán kính bo, độ dày viền và kích thước Dynamic Island đều tính theo tỉ lệ
 * chiều rộng, nên đổi `width` là cả khung co giãn đúng dáng.
 */
export function PhoneFrame({
  src,
  alt,
  width,
  glow = 0.35,
  glowColor = "180 208 1",
  shadow = "lg",
  priority = false,
  className = "",
}: PhoneFrameProps) {
  const height = Math.round(width * ASPECT);
  const radius = Math.round(width * 0.117);
  const border = Math.max(2, Math.round(width * 0.02 * 10) / 10);
  const islandW = Math.round(width * 0.317);
  const islandH = Math.round(width * 0.095);

  const dropShadow =
    shadow === "lg"
      ? "0 30px 60px 0 rgb(0 0 0 / 0.6)"
      : "0 20px 40px 0 rgb(0 0 0 / 0.5)";
  const glowShadow =
    glow > 0
      ? `, 0 0 ${shadow === "lg" ? 60 : 30}px 0 rgb(${glowColor} / ${glow})`
      : "";

  return (
    <div
      className={`relative shrink-0 overflow-hidden bg-space ${className}`}
      style={{
        width,
        height,
        borderRadius: radius,
        border: `${border}px solid #0a2247`,
        boxShadow: `${dropShadow}${glowShadow}`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={393}
        height={852}
        priority={priority}
        sizes={`${width}px`}
        className="pointer-events-none size-full object-cover"
        style={{ borderRadius: radius - border }}
      />
      {/* Dynamic Island */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black"
        style={{
          width: islandW,
          height: islandH,
          top: Math.round(width * 0.028),
        }}
      />
    </div>
  );
}

type PhoneChipProps = {
  children: React.ReactNode;
  /** `solid` = nền gradient lime (máy chính), `outline` = nền tối viền lime. */
  tone?: "solid" | "outline";
  className?: string;
};

/** Nhãn nhỏ gắn ở trên/dưới khung máy: "Trợ lý AI", "Trang chủ", "Tin tức". */
export function PhoneChip({
  children,
  tone = "outline",
  className = "",
}: PhoneChipProps) {
  const styles =
    tone === "solid"
      ? "bg-gradient-to-r from-lime to-lime-soft text-ink"
      : "border border-lime/30 bg-[rgb(4_18_42/0.9)] text-lime backdrop-blur-sm";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] leading-[14px] font-semibold whitespace-nowrap ${styles} ${className}`}
    >
      {children}
    </span>
  );
}
