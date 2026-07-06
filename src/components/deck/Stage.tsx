"use client";

import { useDeck } from "@/components/deck/DeckContext";
import { SLIDES } from "@/data/deck";
import { BackgroundStreaks } from "@/components/logo-details/BackgroundStreaks";
import { NoiseBorder } from "@/components/NoiseBorder";
import { SectionBadge } from "@/components/deck/SectionBadge";
import { SlideView } from "@/components/slides/SlideView";

/**
 * The 16:9 content stage shared by every slide. `container-type: size` makes 1cqw
 * = 1% of stage width, so all cqw-sized slide content scales fluidly. The active
 * slide crossfades in on change; the noise border + streaks frame every slide.
 */
export function Stage() {
  const { index } = useDeck();
  const slide = SLIDES[index];
  const showBadge = slide.kind !== "home" && slide.kind !== "fin" && slide.kind !== "weAre";

  return (
    <div className="relative aspect-video" style={{ width: "min(100cqw, calc(100cqh * 16 / 9))", containerType: "size" }}>
      <BackgroundStreaks />

      <div key={index} className="anim-slide-in absolute inset-0">
        <SlideView slide={slide} />
      </div>

      {showBadge && (
        <SectionBadge n={slide.n} title={slide.title} emoji={slide.kind === "logoDetails" ? "📝" : undefined} />
      )}

      <NoiseBorder thickness={30} speed={1.25} />
    </div>
  );
}
