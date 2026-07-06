import type { Slide } from "@/data/deck";
import { asset } from "@/lib/asset";

/**
 * HOME — the title card. The words FUNTECH / BRAND / IDENTITY are scattered around the
 * central black balloon-logo render (the real pre-rendered scene), with the revision date
 * bottom-right.
 */
export function HomeSlide({ slide }: { slide: Slide }) {
  const [l1, l2, l3] = (slide.headline || "").split("\n");
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* central balloon-logo hero */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/logo-pattern/logo-pattern-01.png")}
        alt=""
        className="absolute left-1/2 top-1/2 z-0 w-[64cqw] -translate-x-1/2 -translate-y-1/2"
        draggable={false}
      />

      {/* scattered wordmark */}
      <h1 className="pointer-events-none absolute inset-0 z-10 font-key font-extrabold uppercase leading-none tracking-[-0.01em] text-foreground">
        <span className="text-noise-edge absolute left-[2.5cqw] top-[3cqh]" style={{ fontSize: "9cqw" }}>{l1}</span>
        <span className="text-noise-edge absolute right-[3cqw] top-[26cqh]" style={{ fontSize: "9cqw" }}>{l2}</span>
        <span className="text-noise-edge absolute bottom-[8cqh] left-[2.5cqw]" style={{ fontSize: "9cqw" }}>{l3}</span>
      </h1>

      {slide.body?.[0] && (
        <p className="absolute bottom-[4cqh] right-[3cqw] z-10 font-key uppercase tracking-[0.28em] text-foreground/70" style={{ fontSize: "1.3cqw" }}>
          {slide.body[0]}
        </p>
      )}
    </div>
  );
}
