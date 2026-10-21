type LogoMarkProps = {
  size?: number;
  tone?: "color" | "white" | "ink";
  className?: string;
};

/** Shared transparent two-arc mark, including decorative watermarks. */
export function LogoMark({
  size = 40,
  tone = "color",
  className = "",
}: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="40 45 770 775"
      role="img"
      aria-label="Mindo"
      data-brand-mark="two-arc"
      data-brand-tone={tone}
      className={`shrink-0 ${className}`}
      style={tone === "white" ? { filter: "brightness(0) invert(1)" } : undefined}
    >
      <image
        href={tone === "ink" ? "/brand/mindo-symbol-ink.svg" : "/brand/mindo-symbol.svg"}
        x="40" y="45" width="770" height="775"
      />
    </svg>
  );
}

type LogoProps = {
  /** `dark` keeps brand colors; `light` makes the entire logo white. */
  tone?: "dark" | "light";
  /** Cỡ dấu hiệu (px). */
  mark?: number;
  /** Class cho chữ "Mindo" — dùng khi cần cỡ chữ riêng. */
  textClassName?: string;
  className?: string;
};

/** Logo đầy đủ: dấu hiệu + chữ "Mindo". */
export function Logo({
  tone = "dark",
  mark = 40,
  textClassName = "text-[22px]",
  className = "",
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 whitespace-nowrap ${className}`}>
      <LogoMark size={mark} tone={tone === "light" ? "white" : "color"} />
      <span className={textClassName}>
        <svg
          viewBox="15 16 556 161"
          width="3.45em"
          height="1em"
          role="img"
          aria-label="mindo"
          data-brand-wordmark="mindo"
          className="block"
          style={tone === "light" ? { filter: "brightness(0) invert(1)" } : undefined}
        >
          <image href="/brand/mindo-wordmark.svg" x="15" y="16" width="556" height="161" />
        </svg>
      </span>
    </span>
  );
}
