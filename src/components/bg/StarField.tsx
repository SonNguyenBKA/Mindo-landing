import { round, seededRandom } from "@/lib/random";

/**
 * Bảng màu theo nền.
 *
 * Lưu ý về `dots` trên nền sáng: theo Figma, các section nền sáng **không** có
 * trường chấm sao — chỉ có sao 4 cánh. Chấm nhỏ màu xám trên nền trắng vừa
 * giống hạt bụi, vừa tương phản quá thấp nên nhấp nháy cũng không nhận ra.
 * Vì vậy các section đó truyền `dots={0}`; màu `dot` dưới đây chỉ là giá trị
 * dự phòng nếu sau này cần dùng.
 */
const TONES = {
  dark: {
    dot: "#f2f6fb",
    sparkles: ["#b4d001", "#7dd3fc", "#f2f6fb", "#a78bfa"],
  },
  light: {
    dot: "#64748b",
    sparkles: ["#a855f7", "#38bdf8", "#f97316", "#22c55e"],
  },
} as const;

type Tone = keyof typeof TONES;

type StarFieldProps = {
  /** Hạt giống — đổi số để có bố cục sao khác nhau giữa các section. */
  seed?: number;
  /** Số sao nhỏ (điểm tròn). */
  dots?: number;
  /** Số sao 4 cánh (sparkle) có màu. */
  sparkles?: number;
  /** Nền đặt lên: quyết định màu chấm sao và bảng màu sao 4 cánh. */
  tone?: Tone;
  className?: string;
};

/**
 * Trường sao — dùng được cho cả section nền tối lẫn nền sáng (xem `tone`).
 *
 * Toàn bộ dùng animation CSS (không GSAP) vì đây là nền trang trí thuần:
 * nhẹ, không cần JS, và tự tắt theo `prefers-reduced-motion`.
 */
export function StarField({
  seed = 1,
  dots = 70,
  sparkles = 14,
  tone = "dark",
  className = "",
}: StarFieldProps) {
  const rand = seededRandom(seed);
  const { dot: dotColor, sparkles: sparkleColors } = TONES[tone];

  const dotStars = Array.from({ length: dots }, () => ({
    left: round(rand() * 100),
    top: round(rand() * 100),
    size: round(0.9 + rand() * 1.9),
    min: round(0.12 + rand() * 0.25),
    max: round(0.55 + rand() * 0.45),
    dur: round(2.6 + rand() * 4.5),
    delay: round(rand() * 5),
  }));

  const sparkleStars = Array.from({ length: sparkles }, () => ({
    left: round(rand() * 100),
    top: round(rand() * 100),
    size: round(7 + rand() * 9),
    color: sparkleColors[Math.floor(rand() * sparkleColors.length)],
    dur: round(3.2 + rand() * 4),
    delay: round(rand() * 6),
    rotate: round(rand() * 90),
  }));

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {dotStars.map((s, i) => (
        <span
          key={`d${i}`}
          className="mindo-twinkle absolute rounded-full"
          style={{
            backgroundColor: dotColor,
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            ["--twinkle-min" as string]: s.min,
            ["--twinkle-max" as string]: s.max,
            ["--twinkle-dur" as string]: `${s.dur}s`,
            ["--twinkle-delay" as string]: `${s.delay}s`,
          }}
        />
      ))}

      {sparkleStars.map((s, i) => (
        <svg
          key={`s${i}`}
          className="mindo-twinkle absolute"
          viewBox="0 0 24 24"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            transform: `rotate(${s.rotate}deg)`,
            ["--twinkle-min" as string]: 0.2,
            ["--twinkle-max" as string]: 0.95,
            ["--twinkle-dur" as string]: `${s.dur}s`,
            ["--twinkle-delay" as string]: `${s.delay}s`,
          }}
        >
          {/* Sao 4 cánh: hai cánh dọc/ngang thắt lại ở giữa */}
          <path
            d="M12 0c.7 6.3 4.9 10.6 12 12-7.1 1.4-11.3 5.7-12 12-.7-6.3-4.9-10.6-12-12C7.1 10.6 11.3 6.3 12 0Z"
            fill={s.color}
          />
        </svg>
      ))}
    </div>
  );
}
