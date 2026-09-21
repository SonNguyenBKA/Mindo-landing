type IconProps = { className?: string };

/**
 * Bộ icon nét 24×24 dùng trong các thẻ tính năng và biểu mẫu.
 * Tất cả vẽ bằng `currentColor` để thừa hưởng màu từ phần tử cha.
 */

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Trợ lý AI — tia lấp lánh. */
export function SparkleIcon({ className = "size-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      {...STROKE}
    >
      <path d="M12 3c.5 4 2.9 6.4 7 7-4.1.6-6.5 3-7 7-.5-4-2.9-6.4-7-7 4.1-.6 6.5-3 7-7Z" />
      <path d="M18.5 3v3M17 4.5h3" />
    </svg>
  );
}

/** Mạng xã hội — nhóm người. */
export function UsersIcon({ className = "size-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      {...STROKE}
    >
      <circle cx="9.5" cy="8" r="3.2" />
      <path d="M3.5 20c0-3.2 2.7-5.2 6-5.2s6 2 6 5.2" />
      <path d="M16.5 5.2a3.2 3.2 0 0 1 0 6M18 14.9c2 .6 3.5 2.3 3.5 4.6" />
    </svg>
  );
}

/** Tin tức — tờ báo. */
export function NewspaperIcon({ className = "size-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      {...STROKE}
    >
      <path d="M4 5.5h13a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 18V5.5Z" />
      <path d="M18.5 9H20a1.5 1.5 0 0 1 1.5 1.5V17a2.5 2.5 0 0 1-2.5 2.5" />
      <path d="M7 9h7M7 12.5h7M7 16h4" />
    </svg>
  );
}

/** Gọi video — camera. */
export function VideoIcon({ className = "size-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      {...STROKE}
    >
      <rect x="2.5" y="6" width="12.5" height="12" rx="3" />
      <path d="M15 11l5-3v8l-5-3v-2Z" />
    </svg>
  );
}

/** Mindo Peer — vòng hở có lõi (nhắc lại dấu hiệu thương hiệu). */
export function PeerIcon({ className = "size-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      {...STROKE}
    >
      <path d="M19.5 7.5A8.5 8.5 0 1 1 12 3.5" />
      <circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Bộ sưu tập Mindo — hình thẻ, giữ đúng icon trong Figma. */
export function WalletIcon({ className = "size-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      {...STROKE}
    >
      <rect x="2.5" y="6" width="19" height="12.5" rx="3" />
      <path d="M2.5 10.5h19" />
      <path d="M17 14.5h1.5" />
    </svg>
  );
}

/** Gọi thoại — ống nghe. */
export function PhoneIcon({ className = "size-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      {...STROKE}
    >
      <path d="M7.7 3.5c.6 0 1.1.4 1.3 1l.9 2.7c.2.6 0 1.2-.5 1.5l-1.3.9a11 11 0 0 0 5.3 5.3l.9-1.3c.4-.5 1-.7 1.5-.5l2.7.9c.6.2 1 .7 1 1.3v2.4c0 .9-.7 1.6-1.6 1.6A16.6 16.6 0 0 1 3.5 5.1c0-.9.7-1.6 1.6-1.6h2.6Z" />
    </svg>
  );
}

/** Nhắn tin — bong bóng chat. */
export function ChatIcon({ className = "size-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      {...STROKE}
    >
      <path d="M20.5 12c0 4.1-3.8 7.4-8.5 7.4-1 0-2-.2-2.9-.5l-4.6 1.4 1.4-3.7A7 7 0 0 1 3.5 12c0-4.1 3.8-7.4 8.5-7.4s8.5 3.3 8.5 7.4Z" />
    </svg>
  );
}

/** Thư — dùng cho thẻ kênh liên hệ. */
export function MailIcon({ className = "size-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      {...STROKE}
    >
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7 7.6 5.4c.5.4 1.3.4 1.8 0L20.5 7" />
    </svg>
  );
}

/** Tài liệu — phân tích tài liệu. */
export function DocumentIcon({ className = "size-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      {...STROKE}
    >
      <path d="M13.5 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8.5l-5-5Z" />
      <path d="M13.5 3.5v5h5M8.5 13h7M8.5 16.5h4.5" />
    </svg>
  );
}

/** Địa cầu — dịch đa ngôn ngữ. */
export function GlobeIcon({ className = "size-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      {...STROKE}
    >
      <circle cx="12" cy="12" r="8.75" />
      <path d="M3.4 9.5h17.2M3.4 14.5h17.2" />
      <path d="M12 3.3c-2.2 2.4-3.4 5.4-3.4 8.7s1.2 6.3 3.4 8.7c2.2-2.4 3.4-5.4 3.4-8.7S14.2 5.7 12 3.3Z" />
    </svg>
  );
}

/** Lịch — lên kế hoạch. */
export function CalendarIcon({ className = "size-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      {...STROKE}
    >
      <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8.5 3.5v4M15.5 3.5v4" />
    </svg>
  );
}

/** Tải xuống — bước 1 của "Ba bước". */
export function DownloadCloudIcon({ className = "size-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      {...STROKE}
    >
      <path d="M12 4v9M8.2 9.5 12 13.3l3.8-3.8M4.5 17.5h15" />
    </svg>
  );
}

/** Thẻ căn cước — bước 2 "Tạo tài khoản". */
export function IdCardIcon({ className = "size-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      {...STROKE}
    >
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <circle cx="8.5" cy="11" r="2" />
      <path d="M5.5 16c.6-1.3 1.7-2 3-2s2.4.7 3 2M14.5 10h4M14.5 13.5h4" />
    </svg>
  );
}

/** La bàn — bước 3 "Khám phá". */
export function CompassIcon({ className = "size-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      {...STROKE}
    >
      <circle cx="12" cy="12" r="8.75" />
      <path d="m14.8 9.2-1.4 4.2-4.2 1.4 1.4-4.2 4.2-1.4Z" />
    </svg>
  );
}

/** Mũi tên xuống — dùng cho select. */
export function ChevronDownIcon({ className = "size-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
      {...STROKE}
    >
      <path d="m4 6.5 4 4 4-4" />
    </svg>
  );
}
