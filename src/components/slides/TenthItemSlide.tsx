import type { Slide } from "@/data/deck";
import { asset } from "@/lib/asset";

// festival items scattered across the stage — [file, left%, top%, width-cqw, rotate-deg]
const ITEMS: [string, number, number, number, number][] = [
  ["towel", 40, 4, 15, -6],
  ["fan", 55, 2, 13, 8],
  ["ennichi", 70, 8, 16, -4],
  ["logo-orange", 86, 4, 11, 10],
  ["plate", 38, 40, 15, 5],
  ["cups", 54, 34, 13, -8],
  ["bottle", 68, 42, 9, 6],
  ["opener", 80, 38, 12, -10],
  ["banana", 90, 44, 10, 14],
  ["tag", 44, 70, 12, -5],
  ["logo-white", 58, 74, 11, 7],
  ["logo-black", 72, 72, 11, -8],
  ["logo-sticker", 85, 74, 12, 10],
];

/** 10th SPECIAL ITEM — the "Million Volt Ennichi" festival goods collage. */
export function TenthItemSlide({ slide }: { slide: Slide }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset("/10th-special-item/items-bg.jpg")} alt="" className="absolute inset-0 size-full object-cover opacity-70" draggable={false} />
      <div className="absolute inset-0 bg-background/30" />

      {ITEMS.map(([file, left, top, w, rot]) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={file}
          src={asset(`/10th-special-item/items/${file}.png`)}
          alt=""
          className="absolute drop-shadow-[0_1cqw_1.5cqw_rgba(0,0,0,0.45)]"
          style={{ left: `${left}cqw`, top: `${top}cqh`, width: `${w}cqw`, transform: `rotate(${rot}deg)` }}
          draggable={false}
        />
      ))}

      <div className="absolute left-[2.5cqw] top-[4cqh] max-w-[30cqw]">
        <p className="font-key uppercase tracking-[0.12em] text-key" style={{ fontSize: "1.6cqw" }}>{slide.kicker}</p>
        <h1 className="text-noise-edge font-extrabold leading-[0.9] text-foreground" style={{ fontSize: "6.5cqw" }}>{slide.headline}</h1>
        {slide.body?.[0] && (
          <p className="mt-[2cqh] text-foreground/90" style={{ fontSize: "1.15cqw", lineHeight: 1.65 }}>{slide.body[0]}</p>
        )}
      </div>
    </div>
  );
}
