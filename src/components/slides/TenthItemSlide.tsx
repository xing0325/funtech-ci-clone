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

      <div className="absolute left-1/2 top-1/2 z-20 flex w-[40cqw] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
        <h1 className="text-noise-edge font-extrabold leading-[0.85] text-foreground" style={{ fontSize: "7cqw" }}>
          <span className="text-key">{slide.kicker}</span> {slide.headline}
        </h1>
        {slide.body?.[0] && (
          <p className="mt-[2.4cqh] max-w-[34cqw] text-foreground/90" style={{ fontSize: "1.15cqw", lineHeight: 1.65 }}>{slide.body[0]}</p>
        )}
        <button className="mt-[3cqh] inline-flex items-center gap-[0.8cqw] rounded-full bg-key px-[2.4cqw] py-[1.2cqh] font-key font-bold text-background transition hover:scale-95" style={{ fontSize: "1.3cqw" }}>
          Get the Items!
          <svg viewBox="0 0 24 24" className="size-[1.4cqw]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
        </button>
      </div>
    </div>
  );
}
