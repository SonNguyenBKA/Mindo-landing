import { ArrowRightIcon } from "@/components/ui/Button";
import { OpenAgencyButton } from "@/components/agency/AgencyCta";
import { PeerYearCard, PeerYearTile } from "@/components/peer/PeerYearCard";

/**
 * Section Mindo Peer — mẫu A "Bộ thẻ", chủ dự án chốt 21/10/2026: chữ căn giữa, bên dưới
 * một dãy thẻ Peer xoè ngang, thẻ năm sinh nằm ngang lớn ở giữa, hai bên là thẻ các mệnh
 * khác (thẻ giữa màu Mộc, theo ý chủ dự án). Chỉ giới thiệu, không có ô nhập.
 */
export function PeerShowcase() {
  return (
    <div className="container-mindo peer-v-a">
      <div className="peer-copy is-center">
        <p className="section-label">Mindo Peer</p>
        <h2 className="section-title">
          Peer mang năm sinh.
          <br />
          <span>Mỗi năm một mệnh riêng.</span>
        </h2>
        <p className="section-description">Mỗi Mindo Peer gắn với một năm sinh, mang Can Chi, con giáp và mệnh ngũ hành riêng.</p>
        <div className="peer-actions">
          <OpenAgencyButton className="peer-agency-button">
            Mở đại lý Mindo Peer
            <ArrowRightIcon />
          </OpenAgencyButton>
          <a className="text-link text-link-light" href="#tai-app">
            Tải app để sở hữu
            <ArrowRightIcon />
          </a>
        </div>
      </div>

      <div className="peer-deck-stage">
        <div className="peer-deck" data-scroll-reveal="" aria-hidden="true">
          <PeerYearTile year={1985} className="peer-deck-tile is-l2" />
          <PeerYearTile year={1996} className="peer-deck-tile is-l1" />
          <PeerYearCard year={1980} className="peer-deck-card" />
          <PeerYearTile year={1987} className="peer-deck-tile is-r1" />
          <PeerYearTile year={1991} className="peer-deck-tile is-r2" />
        </div>
      </div>
    </div>
  );
}
