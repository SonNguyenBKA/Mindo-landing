"use client";

import Image from "next/image";
import { useState } from "react";
import { SceneSurface } from "./SceneSurface";
import { ShootingStars } from "@/components/bg/ShootingStars";

const SCREENS = [
  {
    name: "home",
    label: "Trang chủ",
    src: "/phones/hero-home-orbit.png",
    alt: "Trang chủ ứng dụng Mindo",
  },
  {
    name: "ai",
    label: "Trợ lý AI",
    src: "/phones/hero-ai.png",
    alt: "Trợ lý AI trong ứng dụng Mindo",
  },
  {
    name: "news",
    label: "Tin tức",
    src: "/phones/hero-news.png",
    alt: "Tin tức trong ứng dụng Mindo",
  },
  {
    name: "call",
    label: "Gọi video",
    src: "/phones/video-call.png",
    alt: "Gọi video trong ứng dụng Mindo",
  },
];

export function HeroVisual() {
  const [selected, setSelected] = useState(0);
  return (
    <SceneSurface
      className="hero-visual"
      variant="hero"
      index={selected}
      onSelect={setSelected}
    >
      <span className="hero-active-label" aria-live="polite">
        <span aria-hidden="true" />
        {SCREENS[selected].label}
      </span>
      <div className="hero-orbit" aria-hidden="true" />
      <div className="hero-light-field" aria-hidden="true" />
      <div className="hero-streak-field" aria-hidden="true">
        <ShootingStars count={2} seed={23} colors={["#cfe24a", "#f2f6fb"]} />
      </div>
      <div className="hero-poster scene-poster">
        {SCREENS.map((screen, index) => (
          <button
            key={screen.name}
            type="button"
            aria-label={`Xem màn hình ${screen.label}`}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
            className={`poster-phone poster-slot-${(index - selected + 4) % 4}`}
          >
            <Image
              src={screen.src}
              alt={screen.alt}
              width={393}
              height={852}
              priority={screen.name === "home"}
              sizes="(max-width: 599px) 150px, 250px"
              draggable={false}
            />
          </button>
        ))}
      </div>
      <div className="hero-scene-controls">
        <p className="scene-gesture-hint">Kéo để xoay · Chọn để khám phá</p>
        <div
          className="hero-screen-picker"
          role="group"
          aria-label="Chọn màn hình ứng dụng"
        >
          {SCREENS.map((screen, index) => (
            <button
              key={screen.name}
              type="button"
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              {screen.label}
            </button>
          ))}
        </div>
      </div>
    </SceneSurface>
  );
}
