type Shape = "circle" | "squircle";

type LogoMarkProps = {
  /** Cạnh của ô logo (px). */
  size?: number;
  /** `circle` cho header, `squircle` cho footer và ô CTA. */
  shape?: Shape;
  className?: string;
};

/*
 * Hình học của vòng:
 *   r = 14.4 → chu vi C = 2πr ≈ 90.48
 *   khoảng hở 54° ≈ 13.57 đơn vị chiều dài
 *   nét liền = 90.48 − 13.57 ≈ 76.91
 * SVG vẽ nét từ hướng 3 giờ theo chiều kim đồng hồ, nên phần hở tự rơi vào
 * góc trên-phải — đúng như logo gốc.
 */
const RING_RADIUS = 14.4;
const RING_DASH = 76.91;
const RING_GAP = 13.57;

/**
 * Dấu hiệu Mindo: vòng tròn hở navy + lõi lime trên đĩa trắng.
 *
 * Dựng lại bằng SVG thay vì dùng ảnh JPEG gốc, để nét luôn sắc ở mọi kích cỡ
 * và không mang theo nền trắng vuông khi đặt trên nền tối.
 */
export function LogoMark({
  size = 40,
  shape = "circle",
  className = "",
}: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="Mindo"
      className={className}
    >
      <rect
        width="48"
        height="48"
        rx={shape === "circle" ? 24 : 13}
        fill="#ffffff"
      />
      <circle
        cx="24"
        cy="24"
        r={RING_RADIUS}
        stroke="#0b2447"
        strokeWidth="7.4"
        strokeLinecap="round"
        strokeDasharray={`${RING_DASH} ${RING_GAP}`}
      />
      <circle cx="24" cy="24" r="4.6" fill="#c3dd1b" />
    </svg>
  );
}

type LogoProps = {
  /** `dark` = chữ navy (nền sáng), `light` = chữ trắng (nền tối). */
  tone?: "dark" | "light";
  /** Cỡ dấu hiệu (px). */
  mark?: number;
  /** Class cho chữ "Mindo" — dùng khi cần cỡ chữ riêng. */
  textClassName?: string;
  shape?: Shape;
  className?: string;
};

/** Logo đầy đủ: dấu hiệu + chữ "Mindo". */
export function Logo({
  tone = "dark",
  mark = 40,
  textClassName = "text-[22px]",
  shape = "circle",
  className = "",
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark size={mark} shape={shape} />
      <span
        className={`font-semibold tracking-tight ${textClassName} ${
          tone === "dark" ? "text-[#021c41]" : "text-snow"
        }`}
      >
        Mindo
      </span>
    </span>
  );
}
