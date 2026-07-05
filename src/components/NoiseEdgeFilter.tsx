/**
 * Hidden SVG filter that gives display text its distressed, rough "chalk" edge.
 * Replicates the site's `noise-text-edge-filter` (feTurbulence + feDisplacementMap).
 * Applied via the `.text-noise-edge` utility in globals.css.
 */
export function NoiseEdgeFilter() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute", pointerEvents: "none" }}>
      <defs>
        <filter id="noise-text-edge-filter" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.85" numOctaves="1" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
