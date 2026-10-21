import { Logo, LogoMark } from "@/components/ui/Logo";

export function PeerCard() {
  return (
    <article
      data-scroll-reveal=""
      className="peer-collectible-card"
      aria-label="Mindo Peer, bộ sưu tập Mindo Genesis, số seri 001"
    >
      <div className="peer-card-watermark" aria-hidden="true">
        <LogoMark size={250} />
      </div>
      <div className="peer-card-sheen" aria-hidden="true" />
      <div className="peer-card-heading">
        <Logo mark={32} textClassName="text-[18px] max-sm:text-[16px]" />
        <span>GENESIS</span>
      </div>
      <div className="peer-item-type">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m12 2 8 10-8 10L4 12 12 2Z" />
          <path d="m4 12 8 4 8-4M12 2v14" />
        </svg>
        <span>VẬT PHẨM SỐ</span>
      </div>
      <h3>Mindo Peer</h3>
      <div className="peer-card-footer">
        <div>
          <span>SỐ SERI</span>
          <strong>#001</strong>
        </div>
        <div>
          <span>PHÁT HÀNH BỞI</span>
          <strong>Mindo Official</strong>
        </div>
      </div>
    </article>
  );
}
