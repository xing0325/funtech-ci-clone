"use client";

import type { Slide } from "@/data/deck";
import { asset } from "@/lib/asset";
import { useTheme } from "@/hooks/useTheme";

// scattered stickers around the hero mark — [file, left%, top%, width-cqw, rotate]
const STICKERS: [string, number, number, number, number][] = [
  ["sticker1", 30, 20, 7, -12],
  ["sticker7", 62, 16, 6, 10],
  ["sticker12", 34, 66, 6, 14],
  ["sticker4", 66, 62, 7, -8],
  ["sticker9", 48, 74, 5, 6],
];

/**
 * HOME — the title card. The words FUNTECH / BRAND / IDENTITY are scattered around a
 * central star mark ringed with stickers (a static stand-in for the original's WebGL
 * balloon-logo scene), with the revision date bottom-right.
 */
export function HomeSlide({ slide }: { slide: Slide }) {
  const theme = useTheme();
  const [l1, l2, l3] = (slide.headline || "").split("\n");
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* central mark + stickers */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(`/vision-visual/vision-visual-${theme}.png`)}
        alt=""
        className="absolute left-1/2 top-1/2 z-0 w-[38cqw] -translate-x-1/2 -translate-y-1/2 opacity-95"
        draggable={false}
      />
      {STICKERS.map(([f, x, y, w, r]) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={f}
          src={asset(`/stickers/webp/${f}.webp`)}
          alt=""
          className="absolute z-0"
          style={{ left: `${x}cqw`, top: `${y}cqh`, width: `${w}cqw`, transform: `rotate(${r}deg)` }}
          draggable={false}
        />
      ))}

      {/* scattered wordmark */}
      <h1 className="pointer-events-none absolute inset-0 z-10 font-key font-extrabold uppercase leading-none tracking-[-0.01em] text-foreground">
        <span className="text-noise-edge absolute left-[2.5cqw] top-[3cqh]" style={{ fontSize: "9cqw" }}>{l1}</span>
        <span className="text-noise-edge absolute right-[3cqw] top-[24cqh]" style={{ fontSize: "9cqw" }}>{l2}</span>
        <span className="text-noise-edge absolute bottom-[9cqh] left-[2.5cqw]" style={{ fontSize: "9cqw" }}>{l3}</span>
      </h1>

      {slide.body?.[0] && (
        <p className="absolute bottom-[4cqh] right-[3cqw] z-10 font-key uppercase tracking-[0.28em] text-foreground/70" style={{ fontSize: "1.3cqw" }}>
          {slide.body[0]}
        </p>
      )}
    </div>
  );
}
