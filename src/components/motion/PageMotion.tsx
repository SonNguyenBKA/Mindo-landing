"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

/** Progressive scroll reveals; content stays visible without JavaScript. */
export function PageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const media = gsap.matchMedia(host);
    media.add("(prefers-reduced-motion: no-preference)", () => {
      host
        .querySelectorAll<HTMLElement>("[data-scroll-reveal]")
        .forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power3.out",
              clearProps: "opacity,transform",
              scrollTrigger: { trigger: element, start: "top 92%", once: true },
            },
          );
        });
      host
        .querySelectorAll<HTMLElement>("[data-scroll-group]")
        .forEach((section) => {
          const parts =
            section.querySelectorAll<HTMLElement>("[data-scroll-part]");
          gsap.fromTo(
            parts,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.065,
              ease: "power3.out",
              clearProps: "opacity,transform",
              scrollTrigger: { trigger: section, start: "top 85%", once: true },
            },
          );
        });
    });
    return () => media.revert();
  }, []);
  return <div ref={root}>{children}</div>;
}
