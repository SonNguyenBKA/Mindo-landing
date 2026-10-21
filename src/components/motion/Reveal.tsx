"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Hướng **chuyển động** của phần tử khi xuất hiện, không phải nơi nó xuất phát:
 * `up` là đi lên (bắt đầu từ bên dưới), `left` là đi sang trái (bắt đầu từ bên
 * phải), và tương tự cho các hướng còn lại.
 */
type Direction = "up" | "down" | "left" | "right" | "none";

/** Thẻ HTML được phép bọc ngoài. Giới hạn ở thẻ tĩnh để `ref` luôn an toàn. */
type Tag = "div" | "span" | "section" | "ul" | "ol" | "li" | "p" | "h2" | "h3";

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 16 },
  down: { x: 0, y: -16 },
  left: { x: 16, y: 0 },
  right: { x: -16, y: 0 },
  none: { x: 0, y: 0 },
};

type CommonProps = {
  children: ReactNode;
  className?: string;
  /** Thẻ HTML bọc ngoài. Mặc định `div`. */
  as?: Tag;
  from?: Direction;
  /** Độ trễ trước khi chạy (giây). */
  delay?: number;
  duration?: number;
  /** Scale nhẹ lúc xuất hiện. */
  scale?: number;
  /** Vị trí kích hoạt ScrollTrigger. Mặc định `top 85%`. */
  start?: string;
  id?: string;
};

/**
 * Hiện một khối nội dung khi cuộn tới.
 *
 * Nội dung hiển thị mặc định; animation là progressive enhancement.
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  from = "up",
  delay = 0,
  duration = 0.55,
  scale,
  start = "top 85%",
  id,
}: CommonProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const offset = OFFSETS[from];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, x: offset.x, y: offset.y, scale: scale ?? 1 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease: "power3.out",
          clearProps: "transform,willChange",
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [from, delay, duration, scale, start]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={className}
      id={id}
      data-reveal=""
    >
      {children}
    </Tag>
  );
}

/**
 * Hiện lần lượt (stagger) các phần tử con có `data-reveal`.
 *
 * Dùng cho lưới thẻ: bản thân container không bị ẩn, chỉ các con được ẩn rồi
 * chạy nối tiếp nhau bằng **một** ScrollTrigger duy nhất.
 */
export function RevealStagger({
  children,
  className,
  as: Tag = "div",
  from = "up",
  delay = 0,
  duration = 0.55,
  scale,
  stagger = 0.1,
  start = "top 85%",
  id,
}: CommonProps & { stagger?: number }) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const targets = Array.from(
      el.querySelectorAll<HTMLElement>(":scope > [data-reveal]"),
    );
    if (targets.length === 0) return;

    const offset = OFFSETS[from];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, x: offset.x, y: offset.y, scale: scale ?? 1 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          clearProps: "transform,willChange",
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [from, delay, duration, scale, stagger, start]);

  return (
    <Tag ref={ref as React.Ref<never>} className={className} id={id}>
      {children}
    </Tag>
  );
}

/** Phần tử con của `RevealStagger`. Chỉ đánh dấu, không tự animate. */
export function RevealItem({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
}) {
  return (
    <Tag className={className} data-reveal="">
      {children}
    </Tag>
  );
}
