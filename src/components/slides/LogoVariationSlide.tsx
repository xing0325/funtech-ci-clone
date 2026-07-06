import type { Slide } from "@/data/deck";
import { asset } from "@/lib/asset";

// scattered, rotated variation cards — [file, label, left%, top%, width-cqw, rotate]
const VARIANTS: [string, string, number, number, number, number][] = [
  ["2D", "2D MODE", 40, 3, 22, -7],
  ["3D", "3D MODE", 70, 5, 22, 9],
  ["MATERIAL", "MATERIAL MODE", 22, 40, 21, -11],
  ["TOON", "TOON MODE", 86, 33, 16, 11],
  ["balloon", "BALLOON MODE", 44, 52, 22, 6],
  ["dot", "DOT MODE", 67, 58, 19, -9],
  ["fun", "FUN MODE", 19, 66, 21, 13],
];

/** LOGO VARIATION — the mark rendered across dimensions & materials, as scattered rotated cards. */
export function LogoVariationSlide({ slide }: { slide: Slide }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <h1 className="text-noise-edge absolute left-[2.5cqw] top-[4cqh] z-20 font-extrabold leading-none text-foreground" style={{ fontSize: "4.4cqw" }}>
        {slide.headline}
      </h1>

      {VARIANTS.map(([file, label, left, top, w, rot]) => (
        <div
          key={file}
          className="absolute z-10"
          style={{ left: `${left}cqw`, top: `${top}cqh`, width: `${w}cqw`, transform: `rotate(${rot}deg)` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(`/logo-variation/${file}.png`)} alt={label} className="w-full drop-shadow-[0_0.6cqw_1cqw_rgba(0,0,0,0.5)]" draggable={false} />
          <span className="mt-[0.4cqh] block font-key uppercase tracking-[0.08em] text-key" style={{ fontSize: "0.85cqw" }}>{label}</span>
        </div>
      ))}
    </div>
  );
}
