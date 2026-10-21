"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRightIcon, ButtonLink } from "@/components/ui/Button";
import { SparkleIcon } from "@/components/ui/Icons";

const TOPICS = [
  {
    label: "Chứng khoán",
    title: "Đọc nhịp thị trường từ dòng tiền và doanh nghiệp",
    image: "/news/news-1.jpg",
    alt: "Tòa nhà văn phòng minh họa chủ đề chứng khoán",
    summary: [
      "Theo dõi diễn biến thị trường và thông tin doanh nghiệp.",
      "Kết nối các góc nhìn trước khi tìm hiểu sâu hơn.",
    ],
  },
  {
    label: "Crypto",
    title: "Tài sản số và những chuyển động đáng chú ý",
    image: "/news/news-2.jpg",
    alt: "Thành phố hiện đại minh họa chủ đề tài sản số",
    summary: [
      "Khám phá tin tức thị trường và công nghệ tài sản số.",
      "Theo dõi những chủ đề phù hợp với mối quan tâm của bạn.",
    ],
  },
  {
    label: "Ngoại hối & hàng hóa",
    title: "Tỷ giá, hàng hóa và bức tranh thị trường toàn cầu",
    image: "/news/news-1.jpg",
    alt: "Kiến trúc đô thị minh họa thị trường toàn cầu",
    summary: [
      "Cập nhật các chủ đề về tỷ giá và hàng hóa.",
      "Đặt thông tin trong bối cảnh thị trường rộng hơn.",
    ],
  },
  {
    label: "Kinh tế vĩ mô",
    title: "Những chuyển động lớn phía sau mỗi bản tin",
    image: "/news/news-2.jpg",
    alt: "Đường chân trời đô thị minh họa kinh tế vĩ mô",
    summary: [
      "Theo dõi kinh tế, chính sách và các xu hướng lớn.",
      "Nắm ý chính trước khi đọc toàn bộ nội dung.",
    ],
  },
];

export function News() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const id = useId();
  const topic = TOPICS[selected];
  const onKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % TOPICS.length
        : event.key === "ArrowLeft"
          ? (index + TOPICS.length - 1) % TOPICS.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? TOPICS.length - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  };
  return (
    <section
      id="tin-tuc"
      className="news-section section-pad scroll-below-header"
      aria-labelledby="news-title"
    >
      <div className="container-mindo news-layout">
        <div className="news-copy" data-scroll-group="">
          <p className="section-label" data-scroll-part="">
            Tin tức thị trường
          </p>
          <h2 id="news-title" className="section-title" data-scroll-part="">
            Thị trường trong
            <br />
            <span className="story-emphasis">tầm tay bạn.</span>
          </h2>
          <p className="section-description" data-scroll-part="">
            Từ chứng khoán, crypto đến kinh tế vĩ mô — Mindo tổng hợp tin tức đa
            nguồn, cập nhật liên tục và cá nhân hóa theo điều bạn quan tâm.
          </p>
          <ul className="news-benefits" data-scroll-part="">
            <li>
              <strong>Đa nguồn</strong>
              <span>Góc nhìn toàn diện</span>
            </li>
            <li>
              <strong>Liên tục</strong>
              <span>Theo nhịp thị trường</span>
            </li>
            <li>
              <strong>AI tóm tắt</strong>
              <span>Nắm nhanh ý chính</span>
            </li>
          </ul>
          <div data-scroll-part="">
            <ButtonLink href="/#tai-app" size="md">
              Khám phá tin tức
              <ArrowRightIcon />
            </ButtonLink>
          </div>
        </div>
        <div className="news-preview" data-scroll-reveal="">
          <div className="news-preview-heading">
            <span>Dòng tin của bạn</span>
            <small>Nội dung minh họa</small>
          </div>
          <div className="news-tabs" role="tablist" aria-label="Chủ đề tin tức">
            {TOPICS.map((item, index) => (
              <button
                key={item.label}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                id={`${id}-tab-${index}`}
                role="tab"
                type="button"
                aria-selected={selected === index}
                aria-controls={`${id}-panel`}
                tabIndex={selected === index ? 0 : -1}
                onClick={() => setSelected(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div
            id={`${id}-panel`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${selected}`}
            tabIndex={0}
          >
            <div className="news-photo">
              <Image
                src={topic.image}
                alt={topic.alt}
                fill
                sizes="(max-width: 899px) 90vw, 560px"
              />
              <span>{topic.label}</span>
            </div>
            <div className="news-preview-body">
              <h3>{topic.title}</h3>
              <div className="news-summary">
                <span>
                  <SparkleIcon />
                  AI tóm tắt
                </span>
                <ul>
                  {topic.summary.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
