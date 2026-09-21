type IconProps = { className?: string };

/** Icon mạng xã hội — tô bằng `currentColor` để đổi màu theo trạng thái hover. */

export function FacebookIcon({ className = "size-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M15.1 8.6h-2.3V7.2c0-.7.5-.9.8-.9h1.4V3.8h-2c-2.2 0-2.7 1.6-2.7 2.7v2.1H8.9v2.6h1.4V20h2.5v-8.8h2l.3-2.6Z" />
    </svg>
  );
}

export function XIcon({ className = "size-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.4 3h3.1l-6.8 7.8L21.9 21h-6.3l-4.6-6-5.3 6H2.6l7.2-8.2L2.3 3h6.4l4.3 5.7L17.4 3Zm-1.1 16.1h1.7L7.1 4.8H5.3l11 14.3Z" />
    </svg>
  );
}

export function YoutubeIcon({ className = "size-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M21.6 7.6c-.2-.9-.9-1.6-1.8-1.8C18.1 5.4 12 5.4 12 5.4s-6.1 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 9.3 2 12 2 12s0 2.7.4 4.4c.2.9.9 1.6 1.8 1.8 1.7.4 7.8.4 7.8.4s6.1 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.7.4-4.4.4-4.4s0-2.7-.4-4.4ZM10 15.2V8.8l5.2 3.2-5.2 3.2Z" />
    </svg>
  );
}

export function TiktokIcon({ className = "size-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.6 2h-3v13.2a2.5 2.5 0 1 1-1.8-2.4V9.7a5.7 5.7 0 1 0 4.8 5.6V8.9a6.4 6.4 0 0 0 3.7 1.2V7a3.7 3.7 0 0 1-3.7-3.7V2Z" />
    </svg>
  );
}
