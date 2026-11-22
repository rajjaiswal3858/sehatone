/** SEHATONE mark: a care cross whose centre is a single teal square — "one" system at the core. */
export function LogoMark({ size = 28, inverted = false }: { size?: number; inverted?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="logo__mark">
      <rect width="32" height="32" rx="6" fill={inverted ? "#FFFFFF" : "#0F2A44"} />
      <path d="M12.5 6h7v6.5H26v7h-6.5V26h-7v-6.5H6v-7h6.5z" fill={inverted ? "#0F2A44" : "#FFFFFF"} />
      <rect x="12.5" y="12.5" width="7" height="7" fill="#14A394" />
    </svg>
  );
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className={`logo${inverted ? " logo--inv" : ""}`}>
      <LogoMark inverted={inverted} />
      <span className="logo__word">
        SEHAT<b>ONE</b>
      </span>
    </span>
  );
}
