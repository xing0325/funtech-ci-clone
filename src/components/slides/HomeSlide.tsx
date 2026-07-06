"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { Slide } from "@/data/deck";
import { asset } from "@/lib/asset";

// r3f Canvas is client-only + heavy → load it lazily, keep it out of SSR/prerender
const BalloonScene = dynamic(() => import("@/components/deck/BalloonScene").then((m) => m.BalloonScene), { ssr: false });

/**
 * HOME — the title card. FUNTECH / BRAND / IDENTITY scattered around the interactive 3D
 * balloon-logo (real .glb, drag to spin, mouse-follow tilt). The pre-rendered PNG shows
 * only while the model streams in, then hides so there's no static/3D mismatch.
 */
export function HomeSlide({ slide }: { slide: Slide }) {
  const [ready, setReady] = useState(false);
  const [l1, l2, l3] = (slide.headline || "").split("\n");
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* loading-only fallback — fades out once the model is ready */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/logo-pattern/logo-pattern-01.png")}
        alt=""
        className="absolute left-1/2 top-1/2 z-0 w-[62cqw] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700"
        style={{ opacity: ready ? 0 : 1 }}
        draggable={false}
      />

      {/* live interactive 3D hero — fills the stage so the balloons read large */}
      <div className="absolute inset-0 z-[1]">
        <BalloonScene onReady={() => setReady(true)} />
      </div>

      {/* scattered wordmark (never blocks the drag) */}
      <h1 className="pointer-events-none absolute inset-0 z-10 font-key font-extrabold uppercase leading-none tracking-[-0.01em] text-foreground">
        <span className="text-noise-edge absolute left-[2.5cqw] top-[3cqh]" style={{ fontSize: "9cqw" }}>{l1}</span>
        <span className="text-noise-edge absolute right-[3cqw] top-[26cqh]" style={{ fontSize: "9cqw" }}>{l2}</span>
        <span className="text-noise-edge absolute bottom-[8cqh] left-[2.5cqw]" style={{ fontSize: "9cqw" }}>{l3}</span>
      </h1>

      {slide.body?.[0] && (
        <p className="pointer-events-none absolute bottom-[4cqh] right-[3cqw] z-10 font-key uppercase tracking-[0.28em] text-foreground/70" style={{ fontSize: "1.3cqw" }}>
          {slide.body[0]}
        </p>
      )}
    </div>
  );
}
