/** Decorative diagonal grunge scratches behind the content (top-left + bottom-right corners). */
export function BackgroundStreaks() {
  // fine, irregular diagonal scratches — [x, len, width, opacity]
  const topLeft: number[][] = [
    [2, 16, 0.35, 0.45], [4, 22, 0.18, 0.3], [6, 13, 0.6, 0.6], [7.5, 19, 0.22, 0.35],
    [9, 25, 0.4, 0.5], [11, 15, 0.18, 0.28], [12.5, 20, 0.5, 0.5], [14, 12, 0.22, 0.3],
    [16, 17, 0.35, 0.4], [18, 10, 0.18, 0.25],
  ];
  const bottomRight: number[][] = [
    [76, 12, 0.3, 0.35], [78, 17, 0.18, 0.28], [80, 14, 0.55, 0.55], [82, 20, 0.22, 0.32],
    [84, 11, 0.4, 0.45], [86, 18, 0.18, 0.28], [88, 15, 0.5, 0.5], [90, 22, 0.25, 0.35],
    [92, 12, 0.35, 0.4], [94, 19, 0.18, 0.3], [96, 14, 0.5, 0.5], [98, 10, 0.22, 0.3],
    [100, 17, 0.35, 0.4], [102, 13, 0.18, 0.28],
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 56" preserveAspectRatio="none">
        {topLeft.map(([x, len, w, o], i) => (
          <line key={`tl${i}`} x1={x} y1={-2} x2={x - 8.5} y2={len} stroke="var(--color-key)" strokeWidth={w} opacity={o} strokeLinecap="round" />
        ))}
        {bottomRight.map(([x, len, w, o], i) => (
          <line key={`br${i}`} x1={x} y1={58} x2={x - 10} y2={58 - len} stroke="var(--color-key)" strokeWidth={w} opacity={o} strokeLinecap="round" />
        ))}
      </svg>
    </div>
  );
}
