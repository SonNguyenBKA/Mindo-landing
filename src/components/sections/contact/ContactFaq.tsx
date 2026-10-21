"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: "Bao lâu thì Mindo trả lời?",
    a: "Câu hỏi của quý khách được phúc đáp trong 1h đến 2h tới.",
  },
  {
    q: "Quên mật khẩu thì liên hệ kênh nào?",
    a: "Liên hệ theo số hotline để gặp bộ phận support của Mindo.",
  },
  {
    q: "Muốn mở đại lý hoặc mua Peer theo giá đại lý thì làm sao?",
    a: "Bấm “Mở đại lý Mindo Peer” ở cuối màn hình hoặc mục Đại lý trên menu, để lại thông tin — Mindo sẽ gọi lại tư vấn và báo giá gói. Bạn cũng có thể email peer@mindo.vn.",
  },
  {
    q: "Tôi có thể kinh doanh sản phẩm Mindo ở thị trường quốc tế không?",
    a: "Có, Mindo định hướng phát triển nhiều thị trường, không chỉ ở Việt Nam.",
  },
  {
    q: "Mindo có nhận hỗ trợ qua điện thoại không?",
    a: "Mindo có bộ phận trực hotline để support quý khách tốt nhất.",
  },
];

export function ContactFaq() {
  // Mở sẵn tất cả — đúng trạng thái trong design (mọi hàng đều hiện dấu trừ).
  const [open, setOpen] = useState<boolean[]>(() => FAQS.map(() => true));

  const toggle = (i: number) =>
    setOpen((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="mx-auto mt-10 max-w-[880px] overflow-hidden rounded-[20px] border border-[#e4e9f2] bg-white/70 shadow-[0_4px_24px_0_rgb(2_28_65/0.06)] backdrop-blur-sm">
      {FAQS.map((faq, i) => (
        <FaqRow
          key={faq.q}
          faq={faq}
          open={open[i]}
          onToggle={() => toggle(i)}
          isLast={i === FAQS.length - 1}
        />
      ))}
    </div>
  );
}

function FaqRow({
  faq,
  open,
  onToggle,
  isLast,
}: {
  faq: Faq;
  open: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  // Bỏ qua lần chạy đầu: trạng thái ban đầu do CSS quyết định, không animate.
  const mounted = useRef(false);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.style.height = open ? "auto" : "0px";
      return;
    }

    if (!mounted.current) {
      mounted.current = true;
      el.style.height = open ? "auto" : "0px";
      return;
    }

    const anim = gsap.to(el, {
      // `height: "auto"` được GSAP đo rồi quy về px, nên chuyển động vẫn mượt
      height: open ? "auto" : 0,
      duration: 0.42,
      ease: "power2.inOut",
    });

    return () => {
      anim.kill();
    };
  }, [open]);

  return (
    <div className={isLast ? "" : "border-b border-[#eceff5]"}>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex w-full items-center gap-4 px-7 py-5 text-left transition-colors hover:bg-[#f7f9fc] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-lime"
        >
          <span className="flex-1 text-[17px] leading-[26px] font-semibold text-[#021c41]">
            {faq.q}
          </span>

          {/* Dấu cộng/trừ: thanh dọc xoay và mờ đi khi mở */}
          <span
            aria-hidden="true"
            className="relative inline-flex size-5 shrink-0 items-center justify-center text-slate-dim"
          >
            <span className="absolute h-[1.8px] w-[13px] rounded-full bg-current" />
            <span
              className={`absolute h-[1.8px] w-[13px] rounded-full bg-current transition-transform duration-300 ${
                open ? "rotate-0 opacity-0" : "rotate-90 opacity-100"
              }`}
            />
          </span>
        </button>
      </h3>

      <div ref={panelRef} className="overflow-hidden">
        <p className="px-7 pb-5 text-[15px] leading-[26px] text-slate-dim">
          {faq.a}
        </p>
      </div>
    </div>
  );
}
