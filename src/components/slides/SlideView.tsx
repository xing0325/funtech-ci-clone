import type { Slide } from "@/data/deck";
import { TextSlide } from "./TextSlide";
import { HomeSlide } from "./HomeSlide";
import { VisionVisualSlide } from "./VisionVisualSlide";
import { WayIndexSlide } from "./WayIndexSlide";
import { LogoDetailsSlide } from "./LogoDetailsSlide";
import { LogoVariationSlide } from "./LogoVariationSlide";
import { TenthItemSlide } from "./TenthItemSlide";
import { FinSlide } from "./FinSlide";
import { WaySlide } from "./WaySlide";

/** Picks the right layout component for a slide's kind. */
export function SlideView({ slide }: { slide: Slide }) {
  switch (slide.kind) {
    case "home":
      return <HomeSlide slide={slide} />;
    case "way":
      return <WaySlide slide={slide} />;
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
    case "fin":
      return <FinSlide slide={slide} />;
    default:
      // statement, way, wayIndex fallback, ending, weAre
      return <TextSlide slide={slide} />;
  }
}
