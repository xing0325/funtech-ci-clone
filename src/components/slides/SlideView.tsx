import type { Slide } from "@/data/deck";
import { TextSlide } from "./TextSlide";
import { VisionVisualSlide } from "./VisionVisualSlide";
import { WayIndexSlide } from "./WayIndexSlide";
import { LogoDetailsSlide } from "./LogoDetailsSlide";
import { LogoVariationSlide } from "./LogoVariationSlide";
import { TenthItemSlide } from "./TenthItemSlide";

/** Picks the right layout component for a slide's kind. */
export function SlideView({ slide }: { slide: Slide }) {
  switch (slide.kind) {
    case "visionVisual":
      return <VisionVisualSlide slide={slide} />;
    case "wayIndex":
      return <WayIndexSlide slide={slide} />;
    case "logoDetails":
      return <LogoDetailsSlide />;
    case "logoVariation":
      return <LogoVariationSlide slide={slide} />;
    case "tenthItem":
      return <TenthItemSlide slide={slide} />;
    default:
      // home, statement, way, ending, weAre, fin
      return <TextSlide slide={slide} />;
  }
}
