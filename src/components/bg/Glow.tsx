type GlowProps = {
  /** Màu lõi quầng sáng. */
  color?: string;
  /** Đường kính (px hoặc bất kỳ đơn vị CSS). */
  size?: number | string;
  /** Độ mờ tổng thể. */
  opacity?: number;
  /** Mức blur, px. */
  blur?: number;
  className?: string;
};

/**
 * Quầng sáng tròn mềm — "Quầng lime / navy / indigo" trong Figma.
 * Dùng radial-gradient + blur để ra viền tan dần tự nhiên.
 */
export function Glow({
  color = "#b4d001",
  size = 600,
  opacity = 0.18,
  blur = 90,
  className = "",
}: GlowProps) {
  const dim = typeof size === "number" ? `${size}px` : size;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: dim,
        height: dim,
        opacity,
        filter: `blur(${blur}px)`,
        backgroundImage: `radial-gradient(circle at center, ${color} 0%, ${color}80 38%, transparent 70%)`,
      }}
    />
  );
}

type NebulaProps = {
  color?: string;
  /** Màu lõi sáng bên trong. */
  coreColor?: string;
  size?: number;
  opacity?: number;
  seed?: number;
  className?: string;
};

/**
 * Tinh vân: nhiều cụm khí mờ xếp lệch nhau, cộng hai lõi sáng ở giữa.
 * Cho cảm giác có chiều sâu hơn một quầng tròn đơn thuần.
 */
export function Nebula({
  color = "#b4d001",
  coreColor,
  size = 640,
  opacity = 0.2,
  className = "",
}: NebulaProps) {
  const core = coreColor ?? color;

  // Vị trí/kích thước cụm khí lấy theo tỉ lệ để scale được theo `size`.
  const clouds = [
    { x: 45, y: 53, w: 68, h: 64 },
    { x: 20, y: -2, w: 35, h: 42 },
    { x: 20, y: 29, w: 72, h: 60 },
    { x: 35, y: 17, w: 59, h: 71 },
    { x: 56, y: 55, w: 67, h: 75 },
    { x: 3, y: 11, w: 67, h: 44 },
    { x: 65, y: 63, w: 43, h: 49 },
  ];

  const cores = [
    { x: 58, y: 57, w: 21, h: 20 },
    { x: 50, y: 39, w: 14, h: 13 },
  ];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{ width: size, height: size, opacity }}
    >
      {clouds.map((c, i) => (
        <div
          key={`c${i}`}
          className="absolute rounded-full"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: `${c.w}%`,
            height: `${c.h}%`,
            backgroundColor: color,
            opacity: 0.3,
            filter: `blur(${Math.round(size / 9)}px)`,
          }}
        />
      ))}
      {cores.map((c, i) => (
        <div
          key={`k${i}`}
          className="absolute rounded-full"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: `${c.w}%`,
            height: `${c.h}%`,
            backgroundColor: core,
            opacity: 0.55,
            filter: `blur(${Math.round(size / 16)}px)`,
          }}
        />
      ))}
    </div>
  );
}
