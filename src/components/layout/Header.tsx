"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { ArrowRightIcon } from "@/components/ui/Button";
import { openAgency } from "@/components/agency/AgencyCta";

const NAV = [
  { label: "Tính năng", href: "/#tinh-nang" },
  { label: "Mindo Peer", href: "/#mindo-peer" },
  { label: "Tin tức", href: "/#tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const theme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const root = document.documentElement;
    const previousTheme = theme?.content;
    const previousBackground = root.style.getPropertyValue("--browser-chrome-color");
    const color = scrolled || open ? "#ffffff" : "#04122a";
    if (theme) theme.content = color;
    root.style.setProperty("--browser-chrome-color", color);
    return () => {
      if (theme && previousTheme) theme.content = previousTheme;
      if (previousBackground) root.style.setProperty("--browser-chrome-color", previousBackground);
      else root.style.removeProperty("--browser-chrome-color");
    };
  }, [scrolled, open, pathname]);

  useEffect(() => {
    const panel = dialog.current;
    if (!panel) return;
    if (open && !panel.open) panel.showModal();
    if (!open && panel.open) panel.close();
    document.body.dataset.scrollLocked = String(open);
    const desktop = window.matchMedia("(min-width: 900px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.dataset.scrollLocked = "false";
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <>
      <header
        className={`site-header ${scrolled ? "is-scrolled" : "is-top"}`}
        data-state={scrolled ? "glass" : "transparent"}
      >
        <div className="container-mindo header-inner">
          <Link
            href="/"
            aria-label="Mindo — về trang chủ"
            className="header-logo"
          >
            <Logo tone={scrolled ? "dark" : "light"} mark={38} />
          </Link>
          <nav className="header-nav" aria-label="Điều hướng chính">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.href === pathname ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            {/* Đại lý: mở popup đăng ký mở đại lý (trang đại lý chỉ dành cho đại lý) */}
            <button type="button" className="header-nav-agency" onClick={openAgency} aria-haspopup="dialog">
              Đại lý Peer
            </button>
          </nav>
          <div className="header-actions">
            <a className="header-download" href={pathname === "/" ? "#tai-app" : "/#tai-app"}>
              Tải app <ArrowRightIcon />
            </a>
            <button
              ref={toggle}
              className="menu-toggle"
              type="button"
              aria-label="Mở menu"
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen(true)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="menu-mobile"
        className="mobile-menu"
        aria-label="Menu điều hướng"
        onCancel={() => setOpen(false)}
        onClose={() => {
          setOpen(false);
          toggle.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const r = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < r.left ||
              event.clientX > r.right ||
              event.clientY < r.top ||
              event.clientY > r.bottom
            )
              setOpen(false);
          }
        }}
      >
        <div className="mobile-menu-head">
          <Logo mark={34} />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Đóng menu"
            className="menu-close"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <nav aria-label="Điều hướng chính (mobile)">
          {NAV.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true">0{index + 1}</span>
              {item.label}
              <ArrowRightIcon />
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openAgency();
            }}
          >
            <span aria-hidden="true">0{NAV.length + 1}</span>
            Đại lý Peer
            <ArrowRightIcon />
          </button>
        </nav>
        <a
          className="mobile-menu-download"
          href={pathname === "/" ? "#tai-app" : "/#tai-app"}
          onClick={() => setOpen(false)}
        >
          Tải app Mindo <ArrowRightIcon />
        </a>
      </dialog>
    </>
  );
}
