"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type FloatProps = {
  children: ReactNode;
  className?: string;
  /** Biên độ trôi lên/xuống (px). */
  amplitude?: number;
  /** Thời lượng một lượt (giây). */
  duration?: number;
  /** Lệch pha để nhiều phần tử không trôi đồng loạt. */
  delay?: number;
  /** Xoay nhẹ qua lại (độ). */
  rotate?: number;
};

/**
 * Trôi lơ lửng vô hạn — cho cụm điện thoại, thẻ Peer, icon.
 * Mỗi phần tử nên có `delay` khác nhau để chuyển động trông tự nhiên.
 */
export function Float({
  children,
  className,
  amplitude = 12,
  duration = 4.5,
  delay = 0,
  rotate = 0,
}: FloatProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true, delay });
      tl.to(el, {
        y: -amplitude,
        rotate: rotate,
        duration,
        ease: "sine.inOut",
      });
    }, el);

    return () => ctx.revert();
  }, [amplitude, duration, delay, rotate]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
