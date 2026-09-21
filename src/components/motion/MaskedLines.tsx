"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Thẻ tiêu đề được phép dùng. */
type Tag = "h1" | "h2" | "h3" | "div" | "p";

type MaskedLinesProps = {
  /** Mỗi phần tử là một dòng của tiêu đề. */
  lines: ReactNode[];
  as?: Tag;
  className?: string;
  /**
   * Class cho từng dòng, theo đúng thứ tự của `lines`
   * (ví dụ dòng giữa tô gradient lime).
   *
   * Dùng mảng chứ không dùng hàm: component này chạy ở phía client, mà hàm
   * thì không truyền được qua ranh giới server → client.
   */
  lineClassNames?: (string | null | undefined)[];
  delay?: number;
  stagger?: number;
  start?: string;
  id?: string;
};

/**
 * Tiêu đề chạy lên từ dưới, từng dòng bị "cắt" bởi khung bao —
 * hiệu ứng mask cổ điển, dùng cho H1 hero và các tiêu đề section lớn.
 *
 * Dòng chữ được đặt sẵn `translateY(110%)` bằng CSS (chỉ khi có JS), nên không
 * thấy nội dung nhảy trước lúc animation bắt đầu.
 */
export function MaskedLines({
  lines,
  as: Tag = "h2",
  className,
  lineClassNames,
  delay = 0,
  stagger = 0.11,
  start = "top 85%",
  id,
}: MaskedLinesProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const targets = el.querySelectorAll<HTMLElement>("[data-mask-line] > span");
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        // `y: 0` là bắt buộc, không phải dư thừa: CSS đã đặt sẵn
        // `translateY(110%)`, GSAP đọc giá trị đó và quy ra một offset `y`
        // tính bằng px. Nếu chỉ chạy `yPercent`, offset px kia vẫn còn lại và
        // dòng chữ bị đẩy ra ngoài khung bao -> mất chữ.
        { yPercent: 110, y: 0 },
        {
          yPercent: 0,
          y: 0,
          duration: 1.05,
          delay,
          stagger,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, stagger, start]);

  return (
    <Tag ref={ref as React.Ref<never>} className={className} id={id}>
      {lines.map((line, i) => (
        <span
          key={i}
          data-mask-line=""
          // `pb` nhỏ để dấu thanh tiếng Việt (ạ, ợ, ữ) không bị khung bao cắt
          className="block overflow-hidden pb-[0.08em]"
        >
          <span className={`block ${lineClassNames?.[i] ?? ""}`}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
