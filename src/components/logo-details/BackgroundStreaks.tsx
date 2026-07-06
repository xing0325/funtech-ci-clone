/**
 * Decorative diagonal grunge scratch-streaks behind the content — bold, hand-drawn
 * orange slashes matching the original's aggressive top-left / bottom-right rake.
 */
export function BackgroundStreaks() {
  // bold primary slashes — [x, len, width, opacity]
  const boldTL: number[][] = [
    [3, 30, 1.4, 0.7], [7, 24, 0.9, 0.5], [10, 34, 1.8, 0.8], [14, 26, 1.0, 0.55],
    [17, 20, 2.2, 0.7], [21, 30, 0.8, 0.45], [24, 16, 1.3, 0.6],
  ];
  const boldBR: number[][] = [
    [78, 26, 1.3, 0.65], [82, 34, 1.9, 0.8], [86, 22, 0.9, 0.5], [90, 30, 1.6, 0.7],
    [94, 20, 1.1, 0.55], [98, 32, 2.0, 0.75], [102, 24, 0.9, 0.5],
  ];
  // fine hair scratches layered over the bold ones for grit — [x, len, width, opacity]
  const fineTL: number[][] = [
    [2, 16, 0.3, 0.5], [5, 22, 0.2, 0.35], [8, 13, 0.4, 0.5], [12, 19, 0.22, 0.4],
    [15, 25, 0.35, 0.45], [19, 15, 0.2, 0.3], [23, 20, 0.3, 0.4],
  ];
  const fineBR: number[][] = [
    [80, 12, 0.3, 0.4], [84, 17, 0.2, 0.35], [88, 14, 0.35, 0.45], [92, 20, 0.22, 0.35],
    [96, 11, 0.3, 0.4], [100, 18, 0.2, 0.3], [104, 15, 0.3, 0.4],
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 56" preserveAspectRatio="none">
        {boldTL.map(([x, len, w, o], i) => (
          <line key={`btl${i}`} x1={x} y1={-3} x2={x - 13} y2={len} stroke="var(--color-key)" strokeWidth={w} opacity={o} strokeLinecap="round" />
        ))}
        {boldBR.map(([x, len, w, o], i) => (
          <line key={`bbr${i}`} x1={x} y1={59} x2={x - 15} y2={59 - len} stroke="var(--color-key)" strokeWidth={w} opacity={o} strokeLinecap="round" />
        ))}
        {fineTL.map(([x, len, w, o], i) => (
          <line key={`ftl${i}`} x1={x} y1={-2} x2={x - 8.5} y2={len} stroke="var(--color-key)" strokeWidth={w} opacity={o} strokeLinecap="round" />
        ))}
        {fineBR.map(([x, len, w, o], i) => (
          <line key={`fbr${i}`} x1={x} y1={58} x2={x - 10} y2={58 - len} stroke="var(--color-key)" strokeWidth={w} opacity={o} strokeLinecap="round" />
        ))}
      </svg>
    </div>
  );
}
