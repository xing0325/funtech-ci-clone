import type { CSSProperties } from "react";

/**
 * Animated hand-drawn "boiling" border, framing the content panel and each card.
 * Uses the site's fun-h/fun-v sprite sheets (16 frames each) stepped over time.
 *   fun-h.png = 256×640  (16 horizontal-line frames of 256×40) → top & bottom
 *   fun-v.png = 640×256  (16 vertical-line frames of 40×256)   → left & right
 */
export function NoiseBorder({
  thickness = 40,
  speed = 1.1,
}: {
  thickness?: number;
  speed?: number;
}) {
  const off = -thickness / 2;

  // background image follows the active theme via CSS vars (--noise-h / --noise-v)
  const hStrip: CSSProperties = {
    position: "absolute",
    height: thickness,
    left: 0,
    right: 0,
    backgroundImage: "var(--noise-h)",
    backgroundSize: "256px 640px",
    backgroundRepeat: "repeat-x",
    animation: `noise-border-h-cycle ${speed}s steps(16) infinite`,
  };
  const vStrip: CSSProperties = {
    position: "absolute",
    width: thickness,
    top: 0,
    bottom: 0,
    backgroundImage: "var(--noise-v)",
    backgroundSize: "640px 256px",
    backgroundRepeat: "repeat-y",
    animation: `noise-border-v-cycle ${speed}s steps(16) infinite`,
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
      <span style={{ ...hStrip, top: off }} />
      <span style={{ ...hStrip, bottom: off }} />
      <span style={{ ...vStrip, left: off }} />
      <span style={{ ...vStrip, right: off }} />
    </div>
  );
}
