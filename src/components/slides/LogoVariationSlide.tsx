import type { Slide } from "@/data/deck";
import { asset } from "@/lib/asset";

const VARIANTS = [
  { file: "2D", label: "2D" },
  { file: "3D", label: "3D" },
  { file: "MATERIAL", label: "MATERIAL" },
  { file: "TOON", label: "TOON" },
  { file: "balloon", label: "BALLOON" },
  { file: "dot", label: "DOT" },
  { file: "fun", label: "FUN" },
];

/** LOGO VARIATION — the mark rendered across dimensions & materials. */
export function LogoVariationSlide({ slide }: { slide: Slide }) {
  return (
    <div className="absolute inset-0 flex flex-col px-[2.5cqw] py-[1.5cqh]">
      <h1 className="text-noise-edge font-extrabold leading-none text-foreground" style={{ fontSize: "5cqw", marginTop: "3.5cqh" }}>
        {slide.headline}
      </h1>
      <div className="mt-[3cqh] grid flex-1 grid-cols-4 gap-[1.4cqw] pb-[1cqh]">
        {VARIANTS.map((v) => (
          <figure key={v.file} className="flex flex-col overflow-hidden rounded-[0.4cqw] border border-foreground/12 bg-surface">
            <div className="flex flex-1 items-center justify-center p-[1cqw]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(`/logo-variation/${v.file}.png`)} alt={v.label} className="max-h-full max-w-full object-contain" draggable={false} />
            </div>
            <figcaption className="border-t border-foreground/10 px-[1cqw] py-[0.7cqh] font-key text-key" style={{ fontSize: "0.95cqw" }}>
              {v.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
