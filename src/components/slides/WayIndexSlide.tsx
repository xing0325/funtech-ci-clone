"use client";

import type { Slide } from "@/data/deck";
import { SLIDES } from "@/data/deck";
import { asset } from "@/lib/asset";
import { useDeck } from "@/components/deck/DeckContext";

/** FUNTECH WAY index — the three shared values, each a card that jumps to its slide (06/07/08). */
export function WayIndexSlide({ slide }: { slide: Slide }) {
  const { setIndex } = useDeck();
  const ways = [5, 6, 7].map((i) => ({ i, s: SLIDES[i] })); // WAY_01/02/03

  return (
    <div className="absolute inset-0 flex flex-col px-[3cqw] py-[2cqh]">
      <div className="mt-[3cqh] max-w-[54cqw]">
        <h1 className="text-noise-edge font-extrabold uppercase leading-[0.95] tracking-[-0.01em] text-foreground" style={{ fontSize: "5cqw" }}>
          {(slide.headline || "").split("\n").map((l, i) => (
            <span key={i} className="block">{l}</span>
          ))}
        </h1>
        {slide.body?.[0] && (
          <p className="mt-[2cqh] text-foreground/80" style={{ fontSize: "1.3cqw", lineHeight: 1.7 }}>{slide.body[0]}</p>
        )}
      </div>

      <div className="mt-auto grid grid-cols-3 gap-[1.6cqw] pb-[1cqh] pt-[3cqh]">
        {ways.map(({ i, s }, k) => (
          <button
            key={s.slug}
            onClick={() => setIndex(i)}
            className="group flex flex-col overflow-hidden rounded-[0.4cqw] border border-foreground/15 text-left transition hover:border-key"
          >
            <div className="aspect-video w-full overflow-hidden bg-key">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(`/thumbnails/en/${s.thumb}.webp`)} alt="" className="size-full object-cover transition duration-300 group-hover:scale-105" draggable={false} />
            </div>
            <div className="px-[1cqw] py-[1cqh]">
              <p className="font-key text-key" style={{ fontSize: "1cqw" }}>WAY_0{k + 1}</p>
              <p className="font-bold text-foreground" style={{ fontSize: "1.5cqw" }}>{s.headline?.replace("\n", " ")}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
