import { round, seededRandom } from "@/lib/random";

/** Nền tối dùng màu nhạt và sáng; nền sáng phải dùng màu đậm mới nhìn ra. */
const PALETTES = {
  dark: ["#b4d001", "#7dd3fc", "#a78bfa", "#f2f6fb"],
  light: ["#a855f7", "#38bdf8", "#f97316", "#22c55e"],
} as const;

type Tone = keyof typeof PALETTES;

type ShootingStarsProps = {
  seed?: number;
  /** Số vệt sao băng. */
  count?: number;
  /** Nền đặt lên: quyết định bảng màu mặc định và độ đậm của vệt. */
  tone?: Tone;
  /** Ghi đè bảng màu — dùng khi muốn vệt sao ăn theo màu nhấn của section. */
  colors?: readonly string[];
  className?: string;
};

/**
 * Độ đậm của đuôi vệt, dạng hex alpha.
 *
 * Trên nền sáng, vệt màu mảnh 1–2px rất dễ chìm, nên cần đậm hơn hẳn so với
 * khi đặt trên nền tối.
 */
const TAIL_ALPHA: Record<Tone, string> = { dark: "90", light: "c0" };

/**
 * Sao băng: một vệt đuôi mảnh chuyển sắc + đầu sao sáng ở mũi.
 * Chạy loop bằng CSS keyframes `mindo-streak`.
 */
export function ShootingStars({
  seed = 7,
  count = 5,
  tone = "dark",
  colors,
  className = "",
}: ShootingStarsProps) {
  const rand = seededRandom(seed);
  const palette = colors ?? PALETTES[tone];
  const tailAlpha = TAIL_ALPHA[tone];

  const streaks = Array.from({ length: count }, () => {
    // Giữ góc trong một dải hẹp (22–36°) để cả cụm trông như một trận mưa sao
    // cùng hướng, đúng như các vạch sao băng trong file Figma.
    const angle = round(22 + rand() * 14);
    const length = round(110 + rand() * 170);
    return {
      left: round(rand() * 80),
      top: round(rand() * 75),
      length,
      angle,
      color: palette[Math.floor(rand() * palette.length)],
      dur: round(5 + rand() * 6),
      delay: round(rand() * 9),
      // Đường đi tính theo chính trục nghiêng của vạch, nên chỉ cần một số
      travel: round(length * 2.2),
      thickness: round(1.2 + rand() * 1.1),
    };
  });

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {streaks.map((s, i) => (
        <div
          key={i}
          className="mindo-streak absolute"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.length}px`,
            height: `${s.thickness}px`,
            // Không đặt `transform` ở đây: góc quay do CSS lo, vì transform là
            // một thuộc tính duy nhất và keyframe sẽ ghi đè giá trị inline.
            ["--streak-angle" as string]: `${s.angle}deg`,
            ["--streak-travel" as string]: `${s.travel}px`,
            ["--streak-dur" as string]: `${s.dur}s`,
            ["--streak-delay" as string]: `${s.delay}s`,
          }}
        >
          {/* vệt đuôi: nhạt dần về phía sau */}
          <div
            className="h-full w-full rounded-full"
            style={{
              backgroundImage: `linear-gradient(90deg, transparent 0%, ${s.color}00 5%, ${s.color}${tailAlpha} 100%)`,
            }}
          />
          {/* đầu sao */}
          <div
            className="absolute top-1/2 right-0 h-[3px] w-[3px] -translate-y-1/2 rounded-full"
            style={{
              backgroundColor: s.color,
              boxShadow: `0 0 6px 1px ${s.color}`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
