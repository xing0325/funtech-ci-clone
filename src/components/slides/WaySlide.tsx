import type { Slide } from "@/data/deck";

/**
 * A FUNTECH WAY value (06/07/08). Accent-colored eyebrow + big two-line title + body on
 * the left; a bold themed FUNTECH "poster" panel on the right (stand-in for the original's
 * WebGL key visual). The active theme recolors everything via --color-key.
 */
export function WaySlide({ slide }: { slide: Slide }) {
  return (
    <div className="absolute inset-0 flex items-center gap-[2cqw] px-[3cqw]">
      <div className="w-[52cqw] shrink-0">
        {slide.kicker && (
          <p className="mb-[1.4cqh] font-key uppercase tracking-[0.16em] text-key" style={{ fontSize: "1.7cqw" }}>
            {slide.kicker}
          </p>
        )}
        <h1 className="text-noise-edge font-extrabold leading-[0.92] tracking-[-0.01em] text-key" style={{ fontSize: "6.5cqw" }}>
          {(slide.headline || "").split("\n").map((l, i) => (
            <span key={i} className="block">{l}</span>
          ))}
        </h1>
        <div className="mt-[3cqh] max-w-[44cqw]">
          {(slide.body || []).map((p, i) => (
            <p key={i} className="whitespace-pre-line text-foreground/85" style={{ fontSize: "1.3cqw", lineHeight: 1.7 }}>{p}</p>
          ))}
        </div>
      </div>

      {/* poster panel */}
      <div className="relative flex aspect-square flex-1 items-center justify-center overflow-hidden rounded-[0.6cqw] border-[0.2cqw] border-key/60 bg-[color-mix(in_srgb,var(--color-key)_8%,transparent)]">
        <span
          className="text-noise-edge select-none font-key font-extrabold uppercase leading-[0.8] tracking-[-0.02em] text-key"
          style={{ fontSize: "9cqw", transform: "rotate(-6deg)" }}
          aria-hidden="true"
        >
          FUN<br />TECH
        </span>
      </div>
    </div>
  );
}
