type SparklineProps = {
  /** Dãy giá trị (đơn vị tuỳ ý — sẽ được chuẩn hoá theo min/max). */
  points: number[];
  /** Xu hướng tăng (xanh) hay giảm (đỏ). */
  up?: boolean;
  className?: string;
};

const VIEW_W = 44;
const VIEW_H = 22;
const PAD = 2;

/**
 * Đồ thị mini cho bảng giá realtime: đường gấp khúc + vùng tô nhạt bên dưới.
 * Giá trị được chuẩn hoá nên truyền dãy số thô nào cũng vẽ vừa khung.
 */
export function Sparkline({ points, up = true, className }: SparklineProps) {
  const color = up ? "#22c55e" : "#ef4444";
  const id = `spark-${up ? "up" : "down"}-${points.join("-")}`;

  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;

  const coords = points.map((p, i) => {
    const x = PAD + (i / (points.length - 1)) * (VIEW_W - PAD * 2);
    // Trục y của SVG hướng xuống, nên giá trị lớn phải cho y nhỏ
    const y = VIEW_H - PAD - ((p - min) / span) * (VIEW_H - PAD * 2);
    return [x, y] as const;
  });

  const line = coords
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const area = `${PAD},${VIEW_H} ${line} ${VIEW_W - PAD},${VIEW_H}`;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${id})`} />
      <polyline
        points={line}
        fill="none"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
