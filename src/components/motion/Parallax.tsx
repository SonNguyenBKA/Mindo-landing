"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /**
   * Biên độ dịch chuyển theo trục Y trên toàn bộ hành trình cuộn (px).
   * Số dương = đi xuống chậm hơn trang, số âm = trôi lên.
   */
  y?: number;
  /** Biên độ trục X (px). */
  x?: number;
  /** Xoay nhẹ (độ). */
  rotate?: number;
  /** Phóng to/thu nhỏ theo cuộn. */
  scale?: number;
};

/**
 * Dịch chuyển phần tử theo tiến độ cuộn — dùng cho quầng sáng, tinh vân,
 * cụm điện thoại. `scrub` giữ chuyển động dính theo thanh cuộn.
 */
export function Parallax({
  children,
  className,
  y = 0,
  x = 0,
  rotate = 0,
  scale,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          yPercent: 0,
          y: -y / 2,
          x: -x / 2,
          rotate: -rotate / 2,
          ...(scale !== undefined ? { scale: 1 } : {}),
        },
        {
          y: y / 2,
          x: x / 2,
          rotate: rotate / 2,
          ...(scale !== undefined ? { scale } : {}),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [y, x, rotate, scale]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
