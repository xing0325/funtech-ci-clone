import { CARDS } from "@/data/logoDetails";
import { DetailCard } from "./DetailCard";
import { SectionBadge } from "./SectionBadge";
import { BackgroundStreaks } from "./BackgroundStreaks";
import { NoiseBorder } from "@/components/NoiseBorder";

/**
 * The 16:9 content stage. `container-type: size` makes 1cqw = 1% of stage width,
 * so every cqw-sized child scales fluidly — matching the original's responsive system.
 */
export function LogoDetailsStage() {
  return (
    <div
      className="relative aspect-video"
      style={{ width: "min(100cqw, calc(100cqh * 16 / 9))", containerType: "size" }}
    >
      <BackgroundStreaks />

      <SectionBadge />

      {/* main title */}
      <h1
        className="text-noise-edge absolute z-10 font-bold leading-[0.9] tracking-[-0.01em] text-foreground"
        style={{ left: "1.6cqw", top: "5.4cqw", fontSize: "5.3cqw" }}
      >
        Logo Details
      </h1>

      {/* cards (callout labels, dashed lines & icons are baked into each card's SVG art) */}
      <DetailCard data={CARDS[0]} />
      <DetailCard data={CARDS[1]} />
      <DetailCard data={CARDS[2]} />

      {/* outer panel border (frames the whole stage) */}
      <NoiseBorder thickness={30} speed={1.25} />
    </div>
  );
}
