type IconProps = { className?: string };

/** Logo Apple — dùng `currentColor` để hoà theo màu nút. */
export function AppStoreIcon({ className = "size-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 18 22"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M14.7 11.6c0-2.3 1.4-3.5 1.5-3.6-.8-1.2-2.1-1.4-2.6-1.4-1.4-.1-2.5.8-3.1.8-.6 0-1.6-.8-2.7-.8-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.3 1 8.3.7 1 1.5 2.1 2.6 2.1 1 0 1.4-.7 2.7-.7 1.2 0 1.6.7 2.6.7 1.1 0 1.8-1 2.5-2 .8-1.2 1.1-2.3 1.1-2.4 0 0-2.2-.8-2.2-3.1ZM12.4 4.4c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 2-.5 2.5-1.2Z" />
    </svg>
  );
}

/** Logo Google Play — 4 cánh màu gốc của Google. */
export function GooglePlayIcon({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 18 20" className={className} aria-hidden="true">
      <path
        d="M.9.5A1.5 1.5 0 0 0 .5 1.6v16.8c0 .4.1.8.4 1.1l8.8-9L.9.5Z"
        fill="#34a853"
      />
      <path d="M13.3 6.6 10 4.7 1.5.2 10.4 9l2.9-2.4Z" fill="#ea4335" />
      <path d="M13.3 13.4 10.4 11 1.5 19.8l8.5-4.5 3.3-1.9Z" fill="#fbbc04" />
      <path
        d="m13.3 6.6-2.9 2.4 2.9 2.4 3.4-1.9c.5-.3.5-1.1 0-1.4l-3.4-1.5Z"
        fill="#4285f4"
      />
    </svg>
  );
}
