type TechGridProps = {
  className?: string;
  /** Kích thước ô lưới (px). */
  cell?: number;
  /** Độ mờ của đường lưới. */
  opacity?: number;
  /**
   * Làm mờ dần ra rìa để lưới không bị "cắt" cứng ở cạnh section.
   */
  fade?: boolean;
};

/**
 * "Lưới kỹ thuật" — lưới mảnh phủ lên nền tối, tạo cảm giác bản vẽ kỹ thuật.
 */
export function TechGrid({
  className = "",
  cell = 48,
  opacity = 0.05,
  fade = true,
}: TechGridProps) {
  const mask = fade
    ? "radial-gradient(ellipse 80% 70% at 50% 45%, #000 40%, transparent 100%)"
    : undefined;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        opacity,
        backgroundImage: `linear-gradient(to right, #9fb0c6 1px, transparent 1px), linear-gradient(to bottom, #9fb0c6 1px, transparent 1px)`,
        backgroundSize: `${cell}px ${cell}px`,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}
