import type { ReactNode } from "react";
import { MaskedLines } from "@/components/motion/MaskedLines";
import { Reveal } from "@/components/motion/Reveal";

type SectionHeadingProps = {
  /** Mỗi phần tử là một dòng của tiêu đề. */
  lines: ReactNode[];
  /** Dòng mô tả bên dưới. */
  sub?: ReactNode;
  /**
   * `light` = tiêu đề gradient navy→lam→lime cho section nền sáng.
   * `dark`  = chữ trắng, có thể tô gradient lime cho một vài dòng.
   */
  tone?: "light" | "dark";
  /** Chỉ số các dòng được tô gradient lime (chỉ dùng với `tone="dark"`). */
  limeLines?: number[];
  align?: "center" | "left";
  id?: string;
  className?: string;
};

/**
 * Tiêu đề section: chạy lên theo từng dòng, kèm dòng mô tả hiện sau.
 */
export function SectionHeading({
  lines,
  sub,
  tone = "light",
  limeLines = [],
  align = "center",
  id,
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      id={id}
      className={`${isCenter ? "text-center" : "text-left"} ${className}`}
    >
      <MaskedLines
        as="h2"
        lines={lines}
        className={`text-[clamp(1.75rem,4.4vw,2.5rem)] leading-[1.2] font-bold tracking-[-0.01em] ${
          tone === "light"
            ? // Gradient 3 chặng: navy → lam → lime
              "bg-[linear-gradient(90deg,#021c41_0%,#1e6fd9_50%,#b4d001_100%)] bg-clip-text text-transparent"
            : "text-snow"
        }`}
        lineClassNames={lines.map((_, i) =>
          tone === "dark" && limeLines.includes(i)
            ? "text-gradient-lime"
            : null,
        )}
      />

      {sub ? (
        <Reveal
          as="p"
          from="up"
          delay={0.22}
          className={`mt-4 text-[17px] leading-7 ${
            tone === "light" ? "text-slate-dim" : "text-haze"
          } ${isCenter ? "mx-auto max-w-[760px]" : "max-w-xl"}`}
        >
          {sub}
        </Reveal>
      ) : null}
    </div>
  );
}
