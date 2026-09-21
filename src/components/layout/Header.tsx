"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Tính năng", href: "/#tinh-nang" },
  { label: "Mindo Peer", href: "/#mindo-peer" },
  { label: "Tin tức", href: "/#tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Đổ bóng nhẹ khi trang đã cuộn, để thanh header tách khỏi nội dung.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Khoá cuộn trang khi drawer đang mở.
  useEffect(() => {
    document.body.dataset.scrollLocked = open ? "true" : "false";
    return () => {
      document.body.dataset.scrollLocked = "false";
    };
  }, [open]);

  // Đóng drawer khi chuyển trang.
  //
  // Điều chỉnh state ngay trong render (thay vì trong effect) là cách React
  // khuyến nghị cho việc "reset state khi prop đổi": không tạo thêm một lượt
  // render phụ như khi gọi setState bên trong useEffect.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Esc để đóng, và chuyển tiêu điểm vào/ra khỏi drawer.
  //
  // Drawer che kín màn hình nên nếu không dời tiêu điểm, người dùng bàn phím
  // sẽ vẫn đang đứng ở nút hamburger nằm bên dưới lớp phủ.
  useEffect(() => {
    if (!open) return;

    // Giữ lại phần tử ngay lúc này: tới lúc cleanup chạy, `ref.current` có thể
    // đã trỏ sang node khác (hoặc null) nếu cây React đã render lại.
    const toggle = toggleRef.current;

    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      // Trả tiêu điểm về đúng nút đã mở drawer
      toggle?.focus();
    };
  }, [open]);

  const isActive = (href: string) =>
    href.startsWith("/#") ? pathname === "/" && false : pathname === href;

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[#e9edf2] bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_20px_0_rgb(2_28_65/0.07)]" : ""
      }`}
    >
      <div className="container-mindo">
        <div className="flex h-[calc(var(--header-height)-1px)] items-center justify-between">
          <Link
            href="/"
            className="shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
            aria-label="Mindo — về trang chủ"
          >
            <Logo tone="dark" mark={40} />
          </Link>

          {/* Điều hướng desktop */}
          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Điều hướng chính"
          >
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 text-[15px] leading-[22px] transition-colors ${
                    active
                      ? "font-semibold text-[#021c41]"
                      : "font-medium text-slate-dim hover:text-[#021c41]"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-0.5 w-full rounded-sm bg-gradient-to-r from-lime to-lime-soft transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                    style={{ transformOrigin: "left" }}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/#tai-app"
              className="hidden rounded-xl bg-[#021c41] px-5 py-2.5 text-[14px] leading-5 font-bold text-white transition-colors hover:bg-[#0a2d5e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime sm:block"
            >
              Tải app
            </Link>

            {/* Nút mở drawer */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              className="-mr-2 inline-flex size-10 items-center justify-center rounded-lg text-[#021c41] transition-colors hover:bg-[#f1f4f9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime lg:hidden"
              aria-label="Mở menu"
              aria-expanded={open}
              aria-controls="menu-mobile"
            >
              <span className="relative block h-3.5 w-5">
                <span className="absolute top-0 left-0 block h-[2px] w-full rounded-full bg-current" />
                <span className="absolute top-1.5 left-0 block h-[2px] w-full rounded-full bg-current" />
                <span className="absolute top-3 left-0 block h-[2px] w-full rounded-full bg-current" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Lớp phủ — bấm ra ngoài để đóng */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-space/60 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/*
        Drawer trượt vào từ mép phải.
        Dùng `translate-x` (thuộc tính transform) thay vì đổi `right`/`width`:
        transform chạy trên compositor nên không kích hoạt layout lại ở mỗi
        khung hình — mượt hơn hẳn trên máy yếu.
      */}
      <div
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu điều hướng"
        className={`fixed inset-y-0 right-0 z-50 flex h-dvh w-[min(20rem,85vw)] flex-col border-l border-[#e9edf2] bg-white shadow-[-12px_0_40px_0_rgb(2_28_65/0.18)] transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        // Khi đóng thì loại khỏi thứ tự tab, tránh tiêu điểm lọt vào panel ẩn
        inert={!open}
      >
        <div className="flex h-[calc(var(--header-height)-1px)] shrink-0 items-center justify-between border-b border-[#e9edf2] pr-4 pl-6">
          <Logo tone="dark" mark={32} textClassName="text-[18px]" />
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Đóng menu"
            className="-mr-1 inline-flex size-10 items-center justify-center rounded-lg text-[#021c41] transition-colors hover:bg-[#f1f4f9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
          >
            <svg
              viewBox="0 0 20 20"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="m5 5 10 10M15 5 5 15" />
            </svg>
          </button>
        </div>

        <nav
          className="flex flex-1 flex-col gap-1 overflow-y-auto p-4"
          aria-label="Điều hướng chính (mobile)"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-xl px-3 py-3.5 text-[16px] transition-colors ${
                isActive(item.href)
                  ? "bg-[#f1f4f9] font-semibold text-[#021c41]"
                  : "font-medium text-slate-dim hover:bg-[#f7f9fc] hover:text-[#021c41]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="shrink-0 border-t border-[#e9edf2] p-4">
          <Link
            href="/#tai-app"
            onClick={() => setOpen(false)}
            className="block rounded-xl bg-[#021c41] px-5 py-3.5 text-center text-[15px] font-bold text-white transition-colors hover:bg-[#0a2d5e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
          >
            Tải app
          </Link>
        </div>
      </div>
    </header>
  );
}
