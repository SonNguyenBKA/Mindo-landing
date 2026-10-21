import { Reveal } from "@/components/motion/Reveal";

const STEPS = [
  [
    "Tải app Mindo",
    "Có sẵn trên App Store và Google Play. Hoàn toàn miễn phí.",
  ],
  ["Tạo tài khoản", "Đăng ký và xác minh để mở khóa đầy đủ tính năng."],
  [
    "Bắt đầu khám phá",
    "Hỏi AI, kết nối bạn bè, đọc tin tức và khám phá Mindo Peer.",
  ],
];

export function ThreeSteps() {
  return (
    <section className="steps-section section-pad">
      <div className="container-mindo">
        <Reveal>
          <h2 className="section-title">Bắt đầu thật đơn giản.</h2>
        </Reveal>
        <ol className="steps-list">
          {STEPS.map(([title, desc], i) => (
            <li key={title} data-scroll-reveal="">
              <span className="step-number" aria-hidden="true">
                0{i + 1}
              </span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
