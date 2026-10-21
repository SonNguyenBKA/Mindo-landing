import {
  ArrowRightIcon,
  ButtonLink,
  DownloadIcon,
} from "@/components/ui/Button";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="home-hero" aria-labelledby="hero-title">
      <div className="container-mindo hero-layout">
        <div className="hero-copy">
          <h1 id="hero-title">
            Một Mindo.
            <br />
            <span>Nhiều trải nghiệm.</span>
          </h1>
          <p className="hero-description">
            Làm việc thông minh với AI, kết nối qua tin nhắn và video, đón nhịp
            thị trường — tất cả trong một tài khoản Mindo.
          </p>
          <div className="hero-actions">
            <ButtonLink href="#tai-app">
              <DownloadIcon />
              Tải app miễn phí
            </ButtonLink>
            <a className="text-link text-link-light" href="#tinh-nang">
              Xem tính năng <ArrowRightIcon />
            </a>
          </div>
          <p className="hero-note">Miễn phí · Xác minh danh tính bằng CCCD</p>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
