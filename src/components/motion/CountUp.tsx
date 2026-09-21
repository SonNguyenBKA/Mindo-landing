"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type CountUpProps = {
  /** Giá trị đích. */
  value: number;
  /** Chữ đứng trước số, ví dụ "$". */
  prefix?: string;
  /** Chữ đứng sau số, ví dụ "M+", "%", "★". */
  suffix?: string;
  /** Số chữ số thập phân. */
  decimals?: number;
  duration?: number;
  className?: string;
};

/**
 * Đếm số khi cuộn tới. Giá trị cuối được render sẵn trong HTML nên
 * vẫn đúng với SEO và khi không có JS.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.6,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const counter = { n: 0 };
      gsap.to(counter, {
        n: value,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${prefix}${counter.n.toFixed(decimals)}${suffix}`;
        },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [value, prefix, suffix, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {`${prefix}${value.toFixed(decimals)}${suffix}`}
    </span>
  );
}
