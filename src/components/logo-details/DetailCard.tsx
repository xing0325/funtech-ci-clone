import type { ReactNode } from "react";
import { CardArt } from "./CardArt";
import { NoiseBorder } from "@/components/NoiseBorder";
import type { DetailCardData } from "@/data/logoDetails";

/**
 * One logo-detail card column, absolutely positioned inside the 16:9 cqw stage.
 * Layout: aspect-square art box (inline SVG art + noise border + label/title at
 * bottom-left) with the body copy flowing below it.
 */
export function DetailCard({ data, overlay }: { data: DetailCardData; overlay?: ReactNode }) {
  return (
    <div
      className="absolute z-0 flex flex-col"
      style={{ left: `${data.left}cqw`, top: `${data.top}cqw`, width: "30cqw" }}
    >
      {/* art box */}
      <div className="relative w-full aspect-square overflow-hidden bg-background">
        <CardArt id={data.art} />
        {overlay}
        <NoiseBorder thickness={22} speed={1.15} />
        {/* label + title, bottom-left, over the art */}
        <div className="absolute bottom-[1cqw] left-[0.9cqw] z-20 flex flex-col items-start gap-[0.4cqw]">
          <p className="font-key text-[1cqw] leading-none tracking-normal text-foreground">
            {data.label}
          </p>
          <p className="whitespace-pre-line text-[2.45cqw] font-bold leading-[0.98] tracking-normal text-foreground">
            {data.title}
          </p>
        </div>
      </div>

      {/* body copy below the box */}
      <div className="mt-[1.5cqw] flex flex-col gap-[0.5cqw]">
        {data.body.map((line, i) => (
          <p key={i} className="text-[1.28cqw] font-semibold leading-[1.5] text-foreground">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
