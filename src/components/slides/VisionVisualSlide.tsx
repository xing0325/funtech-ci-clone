"use client";

import type { Slide } from "@/data/deck";
import { asset } from "@/lib/asset";

/** VISION VISUAL — the "team of superstar creators" balloon-logo key visual with copy on the left. */
export function VisionVisualSlide({ slide }: { slide: Slide }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* key visual panel, right — the rainbow balloon-logo render */}
      <div className="absolute right-[2.5cqw] top-1/2 flex aspect-square h-[76cqh] -translate-y-1/2 items-center justify-center overflow-hidden rounded-[0.6cqw] border-[0.18cqw] border-key/40 bg-black/20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/logo-pattern/logo-pattern-00.png")}
          alt=""
          className="w-[92%] object-contain"
          draggable={false}
        />
      </div>
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
