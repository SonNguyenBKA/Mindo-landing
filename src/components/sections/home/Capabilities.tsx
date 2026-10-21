import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRightIcon } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { PeerYearTile } from "@/components/peer/PeerYearCard";
import {
  ChatIcon,
  NewspaperIcon,
  PeerIcon,
  SparkleIcon,
  UsersIcon,
  WalletIcon,
} from "@/components/ui/Icons";

export function Capabilities() {
  return (
    <section
      id="tinh-nang"
      className="capabilities section-pad scroll-below-header"
      aria-labelledby="capabilities-title"
    >
      <div className="container-mindo">
        <Reveal className="section-intro">
          <div>
            <p className="section-label">Không gian số của bạn</p>
            <h2 id="capabilities-title" className="section-title">
              Một tài khoản.
              <br />
              Cả thế giới kết nối.
            </h2>
          </div>
          <p className="section-description">
            AI cho công việc. Kết nối cho cuộc sống.
            <br className="hidden sm:block" /> Những trải nghiệm thiết yếu,
            chung một nơi.
          </p>
        </Reveal>
        <div className="capability-bento">
          <Link
            href="#tro-ly-ai"
            data-scroll-reveal=""
            className="feature-tile feature-ai"
          >
            <span className="feature-tag">
              <SparkleIcon />
              Trợ lý AI
            </span>
            <h3>
              Một câu hỏi.
              <br />
              Mở thêm góc nhìn.
            </h3>
            <p>
              Hỏi đáp, tài liệu và ý tưởng.
              <br />
              Luôn có Mindo đồng hành.
            </p>
            <div className="feature-ai-visual" aria-hidden="true">
              <div className="feature-ai-orbit" />
              <div className="feature-ai-phone">
                <Image
                  src="/phones/ai-chat.png"
                  alt=""
                  width={393}
                  height={852}
                  sizes="250px"
                />
              </div>
              <span className="feature-ai-message">
                <SparkleIcon />
                Bắt đầu tuần mới cùng Mindo.
              </span>
            </div>
            <span className="feature-link-label">
              Khám phá Mindo AI
              <ArrowRightIcon />
            </span>
          </Link>
          <Link
            href="#ket-noi"
            data-scroll-reveal=""
            className="feature-tile feature-connect"
          >
            <span className="feature-tag">
              <ChatIcon />
              Nhắn tin & gọi điện
            </span>
            <h3>
              Kết nối không
              <br />
              còn khoảng cách.
            </h3>
            <div className="feature-call-preview" aria-hidden="true">
              <Image
                src="/phones/video-call.png"
                alt=""
                width={393}
                height={852}
                sizes="140px"
              />
            </div>
            <span className="feature-arrow">
              <ArrowRightIcon />
            </span>
          </Link>
          <Link
            href="#tin-tuc"
            data-scroll-reveal=""
            className="feature-tile feature-news"
          >
            <Image
              className="feature-news-photo"
              src="/news/news-1.jpg"
              alt=""
              fill
              sizes="(max-width: 700px) 90vw, 500px"
            />
            <div className="feature-news-copy">
              <span className="feature-tag">
                <NewspaperIcon />
                Tin tức
              </span>
              <h3>
                Thế giới chuyển động.
                <br />
                Bạn luôn theo kịp.
              </h3>
            </div>
            <span className="feature-arrow">
              <ArrowRightIcon />
            </span>
          </Link>
          <Link
            href="#ket-noi"
            data-scroll-reveal=""
            className="feature-tile feature-social"
          >
            <span className="feature-tag">
              <UsersIcon />
              Mạng xã hội
            </span>
            <h3>
              Gần nhau hơn.
              <br />
              Mỗi ngày.
            </h3>
            <div className="feature-network" aria-hidden="true">
              <span>
                <UsersIcon />
              </span>
              <span>
                <ChatIcon />
              </span>
              <span>
                <LogoMark size={32} tone="white" />
              </span>
            </div>
            <span className="feature-arrow">
              <ArrowRightIcon />
            </span>
          </Link>
          <Link
            href="#mindo-peer"
            data-scroll-reveal=""
            className="feature-tile feature-peer"
          >
            <span className="feature-tag">
              <PeerIcon />
              Mindo Peer
            </span>
            <h3>
              Peer năm sinh.
              <br />
              Mỗi năm một mệnh.
            </h3>
            <div className="feature-coin" aria-hidden="true">
              <LogoMark size={76} tone="ink" />
            </div>
            <span className="feature-arrow">
              <ArrowRightIcon />
            </span>
          </Link>
          <Link
            href="#mindo-peer"
            data-scroll-reveal=""
            className="feature-tile feature-collection"
          >
            <span className="feature-tag">
              <WalletIcon />
              Bộ sưu tập Mindo
            </span>
            <h3>
              Mỗi vật phẩm.
              <br />
              Một câu chuyện.
            </h3>
            <div className="feature-collection-art" aria-hidden="true">
              {/* Peer theo năm sinh, màu theo mệnh — như thẻ trong app */}
              <span>
                <PeerYearTile year={1991} />
              </span>
              <span>
                <PeerYearTile year={1985} />
              </span>
            </div>
            <span className="feature-arrow">
              <ArrowRightIcon />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
