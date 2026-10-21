"use client";

import { useEffect } from "react";
import { ScrollTrigger, prefersReducedMotion, registerGsap } from "@/lib/gsap";

/**
 * Lo phần "hạ tầng" cho ScrollTrigger:
 *  - đăng ký plugin
 *  - refresh lại sau khi web-font và ảnh đã tải (tránh lệch vị trí trigger)
 *  - dọn dẹp khi unmount
 *
 * Không render ra DOM.
 */
export function SmoothScrollProvider() {
  useEffect(() => {
    registerGsap();

    if (prefersReducedMotion()) return;

    // Font hoặc ảnh tải xong làm thay đổi chiều cao trang -> vị trí trigger lệch.
    // Wait until scrolling finishes so lazy images cannot interrupt anchor travel.
    const refresh = () => ScrollTrigger.refresh(true);

    const fontsReady = document.fonts?.ready;
    fontsReady?.then(refresh).catch(() => {});

    window.addEventListener("load", refresh);

    // Ảnh lazy-load xong cũng cần refresh.
    const images = Array.from(document.images).filter((img) => !img.complete);
    images.forEach((img) => {
      img.addEventListener("load", refresh, { once: true });
      img.addEventListener("error", refresh, { once: true });
    });

    return () => {
      window.removeEventListener("load", refresh);
      images.forEach((img) => {
        img.removeEventListener("load", refresh);
        img.removeEventListener("error", refresh);
      });
    };
  }, []);

  return null;
}
