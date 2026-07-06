import type { Slide } from "@/data/deck";
import { asset } from "@/lib/asset";

// closing link cards — [image, label, download?, top-offset-cqh, rotate]
const CARDS: [string, string, boolean, number, number][] = [
  ["/fin/corporate.jpg", "Corporate Website", false, 6, -2],
  ["/fin/recruit.jpg", "Recruit", false, 14, 1.5],
  ["/fin/brand.jpg", "Brand Identity (PDF)", true, 22, -1.5],
];

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" className="size-[1.4cqw]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}
function ArrowDown() {
  return (
    <svg viewBox="0 0 24 24" className="size-[1.4cqw]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v14m0 0l-5-5m5 5l5-5" />
    </svg>
  );
}

/** FIN — the three closing link cards (corporate site, recruit, brand-identity PDF). */
export function FinSlide(_props: { slide: Slide }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[2.5cqw] px-[3cqw]">
      {CARDS.map(([img, label, dl, top, rot]) => (
        <figure
          key={label}
          className="group flex w-[26cqw] flex-col overflow-hidden rounded-[0.5cqw] border border-foreground/15 bg-surface transition hover:border-key"
          style={{ marginTop: `${top}cqh`, transform: `rotate(${rot}deg)` }}
        >
          <div className="aspect-video w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(img)} alt="" className="size-full object-cover transition duration-500 group-hover:scale-105" draggable={false} />
          </div>
          <figcaption className="flex items-center justify-between px-[1.2cqw] py-[1cqh] text-foreground" style={{ fontSize: "1.3cqw" }}>
            <span className="font-semibold">{label}</span>
            <span className="text-key">{dl ? <ArrowDown /> : <ArrowUpRight />}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
