"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Đăng ký plugin một lần duy nhất. An toàn khi gọi nhiều lần và khi
 * chạy trên server (chỉ đăng ký khi đã có `window`).
 */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
  registered = true;
}

registerGsap();

/** Người dùng có yêu cầu giảm chuyển động hay không. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger };
