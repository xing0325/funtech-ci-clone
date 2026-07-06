import { CARDS } from "@/data/logoDetails";
import { DetailCard } from "@/components/logo-details/DetailCard";

/** LOGO DETAILS — the three annotated construction cards (art + callouts baked into each card's SVG). */
export function LogoDetailsSlide() {
  return (
    <div className="absolute inset-0">
      {/* main title */}
      <h1
        className="text-noise-edge absolute z-10 font-bold leading-[0.9] tracking-[-0.01em] text-foreground"
        style={{ left: "1.6cqw", top: "5.4cqw", fontSize: "5.3cqw" }}
      >
        Logo Details
      </h1>

      <DetailCard data={CARDS[0]} />
      <DetailCard data={CARDS[1]} />
      <DetailCard data={CARDS[2]} />
    </div>
  );
}
