"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "@/components/ui/Button";
import { SceneSurface } from "./SceneSurface";
import { LogoMark } from "@/components/ui/Logo";

const STORIES = [
  {
    id: "tro-ly-ai",
    label: "Trợ lý AI",
    title: "Làm việc thông minh.\nBứt phá cùng AI.",
    accentLine: 1,
    desc: "Hỏi đáp, phân tích tài liệu, dịch ngôn ngữ và lên kế hoạch — để bạn dành nhiều thời gian hơn cho điều quan trọng.",
    src: "/phones/ai-chat.png",
    alt: "Mindo AI gợi ý kế hoạch cho tuần mới",
    cta: "Thử Mindo AI",
  },
  {
    id: "ket-noi",
    label: "Kết nối",
    title: "Gần nhau hơn.\nKết nối liền mạch.",
    accentLine: 0,
    desc: "Từ tin nhắn nhanh đến cuộc gọi video, mọi cuộc trò chuyện ở cùng một nơi — cho bạn bè, gia đình và cộng đồng.",
    src: "/phones/video-call.png",
    alt: "Cuộc gọi video trong ứng dụng Mindo",
    cta: "Kết nối cùng Mindo",
  },
];

export function ProductStory() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections =
      root.current?.querySelectorAll<HTMLElement>("[data-story]");
    if (!sections) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.45;
      let next = 0;
      sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= readingLine) next = index;
      });
      setActive(next);
    };
    // Two bounded DOM reads also handle deep links that skip the entire story.
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div className="product-story" ref={root}>
      <div className="container-mindo story-layout">
        <div className="story-visual" data-active={active}>
          <SceneSurface
            className="story-phone-stage"
            variant="story"
            index={active}
          >
            <div className="story-stage-halo" aria-hidden="true">
              <span className="story-stage-watermark">
                <LogoMark size={420} />
              </span>
            </div>
            <div className="story-phone scene-poster">
              {STORIES.map((story, index) => (
                <Image
                  key={story.id}
                  src={story.src}
                  alt={story.alt}
                  width={393}
                  height={852}
                  sizes="260px"
                  className={index === active ? "is-active" : ""}
                  aria-hidden={index !== active}
                />
              ))}
            </div>
          </SceneSurface>
          <nav className="story-navigation" aria-label="Khám phá trải nghiệm">
            {STORIES.map((story, index) => (
              <a
                key={story.id}
                href={`#${story.id}`}
                aria-current={index === active ? "step" : undefined}
              >
                <span className="story-dot" />
                {story.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="story-content">
          {STORIES.map((story, index) => (
            <section
              key={story.id}
              id={story.id}
              data-story={index}
              data-scroll-group=""
              className="story-section scroll-below-header"
              aria-labelledby={`${story.id}-title`}
            >
              <p className="section-label" data-scroll-part="">
                {story.label}
              </p>
              <h2
                id={`${story.id}-title`}
                className="section-title"
                data-scroll-part=""
              >
                {story.title.split("\n").map((line, lineIndex) => (
                  <span
                    key={line}
                    className={
                      lineIndex === story.accentLine
                        ? "story-emphasis"
                        : undefined
                    }
                  >
                    {line}
                  </span>
                ))}
              </h2>
              <p className="section-description" data-scroll-part="">
                {story.desc}
              </p>
              <div className="story-mobile-image" data-scroll-reveal="">
                <span className="story-stage-watermark" aria-hidden="true">
                  <LogoMark size={360} />
                </span>
                <Image
                  src={story.src}
                  alt={story.alt}
                  width={393}
                  height={852}
                  sizes="180px"
                />
              </div>
              <Link className="text-link" href="/#tai-app" data-scroll-part="">
                {story.cta}
                <ArrowRightIcon />
              </Link>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
