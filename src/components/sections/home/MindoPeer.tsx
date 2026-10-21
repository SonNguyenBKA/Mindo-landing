import { PeerShowcase } from "./PeerShowcase";

/**
 * Mindo Peer (21/10/2026): mỗi Peer là một năm sinh, màu theo mệnh, con giáp riêng.
 * Landing chỉ giới thiệu: tiêu đề, một câu, hai nút và hình thẻ Peer.
 */
export function MindoPeer() {
  return (
    <section id="mindo-peer" className="peer-section section-pad scroll-below-header">
      <PeerShowcase />
    </section>
  );
}
