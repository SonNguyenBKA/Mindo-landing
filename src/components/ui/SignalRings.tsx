type SignalRingsProps = {
  /** Màu viền vòng (thường trùng màu nhấn của thẻ). */
  color: string;
  /**
   * Góc mà chùm vòng nhô ra:
   *   `tr` — trên-phải (thẻ năng lực ở trang chủ)
   *   `tl` — trên-trái (thẻ kênh liên hệ)
   */
  corner?: "tr" | "tl";
  className?: string;
};

/** Ba vòng đồng tâm: đường kính và độ lệch lấy đúng theo Figma. */
const RINGS = [
  { size: 376, offset: -134, opacity: 0.16 },
  { size: 280, offset: -90, opacity: 0.22 },
  { size: 192, offset: -46, opacity: 0.28 },
];

/**
 * "Vòng tín hiệu": ba vòng tròn viền đồng tâm nhô ra khỏi một góc của thẻ,
 * gợi hình sóng phát tín hiệu. Thẻ chứa cần `overflow-hidden`.
 */
export function SignalRings({
  color,
  corner = "tr",
  className = "",
}: SignalRingsProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      {RINGS.map((r) => (
        <span
          key={r.size}
          className="absolute rounded-full border"
          style={{
            width: r.size,
            height: r.size,
            top: r.offset,
            // Góc trên-phải: đẩy vòng sang phải bằng chính độ lệch âm.
            // Góc trên-trái: dùng luôn độ lệch âm cho `left`.
            ...(corner === "tr" ? { right: r.offset } : { left: r.offset }),
            borderColor: color,
            opacity: r.opacity,
          }}
        />
      ))}
    </div>
  );
}
