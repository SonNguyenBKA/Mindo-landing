import { LogoMark } from "@/components/ui/Logo";
import { peerYear } from "@/lib/peer-menh";

/**
 * Thẻ Peer năm sinh, nằm ngang như thẻ ngân hàng — cùng thiết kế màn chi tiết Peer
 * trên app và web đại lý: màu theo mệnh (5 hành × dương đậm / âm nhạt), năm sinh in to
 * giữa thẻ, mệnh nạp âm ở chân như tên chủ thẻ, "Can Chi · Mệnh" góc phải, con giáp
 * trọn hình mờ bên phải.
 */
export function PeerYearCard({ year, className = "" }: { year: number; className?: string }) {
  const menh = peerYear(year);
  return (
    <article
      className={`peer-year-card ${className}`}
      style={{ background: menh.background }}
      aria-label={`Mindo Peer năm ${year} · ${menh.canChi} · mệnh ${menh.napAm}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG nhỏ, tô trắng bằng CSS */}
      <img className={`peer-year-animal ${menh.duong ? "is-duong" : "is-am"}`} src={menh.animalSrc} alt="" aria-hidden="true" />
      <div className="peer-year-brand">
        <LogoMark size={26} tone="white" />
        <span>Mindo Peer</span>
      </div>
      <strong className="peer-year-number">{year}</strong>
      <div className="peer-year-foot">
        <div>
          <span>Mệnh</span>
          <b>{menh.napAm}</b>
        </div>
        <div className="peer-year-canchi">
          <span>{menh.canChi}</span>
          <b>{menh.element}</b>
        </div>
      </div>
      <span className="peer-year-sheen" aria-hidden="true" />
    </article>
  );
}

/** Thẻ đứng nhỏ (như lưới Peer trong app) — dùng cho dàn thẻ phía sau */
export function PeerYearTile({ year, className = "", style }: { year: number; className?: string; style?: React.CSSProperties }) {
  const menh = peerYear(year);
  return (
    <div className={`peer-year-tile ${className}`} style={{ background: menh.background, ...style }} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG nhỏ, tô trắng bằng CSS */}
      <img className={`peer-year-animal ${menh.duong ? "is-duong" : "is-am"}`} src={menh.animalSrc} alt="" />
      <span className="peer-year-tile-number">{year}</span>
      <span className="peer-year-tile-tag">
        {menh.canChi}
        <b>{menh.element}</b>
      </span>
    </div>
  );
}
