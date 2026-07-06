"use client";

import type { Slide } from "@/data/deck";
import { asset } from "@/lib/asset";
import { useTheme } from "@/hooks/useTheme";

/** VISION VISUAL — the theme-matched hero key visual (fun / volt / breaker) with copy on the left. */
export function VisionVisualSlide({ slide }: { slide: Slide }) {
  const theme = useTheme();
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(`/vision-visual/vision-visual-${theme}.png`)}
        alt=""
        className="absolute right-0 top-0 h-full w-[58cqw] object-cover object-center"
        draggable={false}
      />
      <div className="absolute inset-y-0 left-0 w-[62cqw] bg-gradient-to-r from-background via-background/85 to-transparent" />
      <div className="absolute inset-y-0 left-0 flex w-[52cqw] flex-col justify-center px-[3cqw]">
        <h1
          className="text-noise-edge font-extrabold leading-[0.95] tracking-[-0.01em] text-foreground"
          style={{ fontSize: "5.6cqw" }}
        >
          {(slide.headline || "").split("\n").map((l, i) => (
            <span key={i} className="block">{l}</span>
          ))}
        </h1>
        <div className="mt-[3cqh] space-y-[1.6cqh]">
          {(slide.body || []).map((p, i) => (
            <p key={i} className="text-foreground/85" style={{ fontSize: "1.3cqw", lineHeight: 1.7 }}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
