/**
 * Overlay for DETAILS_01: the "Fun-kun Fire!" / "Fun-kun Shoes!" annotations
 * with dashed connector lines. The orange circles + icons are baked into the card art SVG;
 * this adds the marker-style text labels and the dashed leader lines.
 */
export function FunkunCallouts() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* fire label -> fire circle */}
        <line x1="41" y1="13" x2="60" y2="22" stroke="var(--color-key)" strokeWidth="0.4" strokeDasharray="1.4 1.2" />
        {/* shoe circle -> shoe label */}
        <line x1="52" y1="62" x2="70" y2="61" stroke="var(--color-key)" strokeWidth="0.4" strokeDasharray="1.4 1.2" />
      </svg>
      <span
        className="absolute font-bold italic leading-[1.05] text-key"
        style={{ left: "16%", top: "6%", fontSize: "1.5cqw" }}
      >
        Fun-kun
        <br />
        Fire!
      </span>
      <span
        className="absolute font-bold italic leading-[1.05] text-key"
        style={{ left: "62%", top: "55%", fontSize: "1.5cqw" }}
      >
        Fun-kun
        <br />
        Shoes!
      </span>
    </div>
  );
}
