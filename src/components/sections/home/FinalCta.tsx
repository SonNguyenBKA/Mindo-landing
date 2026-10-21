import { LogoMark } from "@/components/ui/Logo";
import { AppStoreIcon, GooglePlayIcon } from "@/components/ui/StoreIcons";
import { Reveal } from "@/components/motion/Reveal";

export function FinalCta() {
  return (
    <section
      id="tai-app"
      className="download-section section-pad scroll-below-header"
    >
      <div className="download-watermark" aria-hidden="true">
        <LogoMark size={760} />
      </div>
      <div className="container-mindo download-layout">
        <Reveal>
          <LogoMark size={56} tone="ink" />
          <h2 className="section-title">
            Mindo ở đây.
            <br />
            Bắt đầu cùng bạn.
          </h2>
          <p className="section-description">
            AI, kết nối và những trải nghiệm mới.
            <br />
            Tất cả trong một ứng dụng.
          </p>
        </Reveal>
        <div className="download-actions">
          <StoreButton
            href="https://apps.apple.com"
            kicker="Download on the"
            name="App Store"
            icon={<AppStoreIcon className="h-7 w-6" />}
          />
          <StoreButton
            href="https://play.google.com"
            kicker="GET IT ON"
            name="Google Play"
            icon={<GooglePlayIcon className="size-6" />}
          />
          <p>Miễn phí trên iOS và Android</p>
        </div>
      </div>
    </section>
  );
}

function StoreButton({
  href,
  kicker,
  name,
  icon,
}: {
  href: string;
  kicker: string;
  name: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="store-button"
      data-scroll-reveal=""
    >
      {icon}
      <span>
        <small>{kicker}</small>
        <strong>{name}</strong>
      </span>
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M5 15 15 5M5 5h10v10" />
      </svg>
    </a>
  );
}
