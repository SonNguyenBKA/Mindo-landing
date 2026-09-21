import type { ReactNode } from "react";

type ScaledStageProps = {
  /** Chiều rộng gốc của cụm (px) — đúng như trong Figma. */
  width: number;
  /** Chiều cao gốc của cụm (px). */
  height: number;
  /**
   * Class đặt biến `--stage-scale` theo từng breakpoint, ví dụ:
   * `"[--stage-scale:0.6] sm:[--stage-scale:0.85] lg:[--stage-scale:1]"`
   *
   * Điều kiện để cụm không bị cắt ở hai bên:
   *
   *     width × scale  ≤  bề rộng viewport − lề hai bên
   *
   * Lề của `container-mindo`/`container-hero`: 48px (dưới 768px), 96px
   * (768–1279px), 288px/224px (từ 1280px). Thêm breakpoint mới thì tính lại
   * theo công thức trên, đừng đoán.
   */
  className?: string;
  children: ReactNode;
};

/**
 * Khung chứa cho các cụm dựng bằng toạ độ tuyệt đối (cụm điện thoại, thẻ Peer).
 *
 * Bên trong vẫn là kích thước gốc theo Figma nên mọi `top/left` tuyệt đối giữ
 * đúng tương quan; bên ngoài thì thu nhỏ bằng `scale`.
 *
 * Điểm quan trọng: `transform: scale()` **không** làm nhỏ ô mà phần tử chiếm
 * trong layout, nên nếu chỉ scale thì sẽ chừa ra một vùng trống lớn quanh cụm
 * trên mobile. Vì vậy lớp ngoài tự tính lại `width`/`height` theo cùng hệ số.
 */
export function ScaledStage({
  width,
  height,
  className = "",
  children,
}: ScaledStageProps) {
  return (
    <div
      className={className}
      style={{
        width: `calc(${width}px * var(--stage-scale, 1))`,
        height: `calc(${height}px * var(--stage-scale, 1))`,
      }}
    >
      <div
        className="relative"
        style={{
          width,
          height,
          transform: "scale(var(--stage-scale, 1))",
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
