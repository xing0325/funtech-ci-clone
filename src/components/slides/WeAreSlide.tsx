import type { Slide } from "@/data/deck";
import { asset } from "@/lib/asset";

// the crew — each photo already has its balloon letter + "WE ARE FUNTECH" composited in
const MEMBERS = [
  "Furuhashi", "Hashimoto", "Horino", "Jokura", "Kariya", "Kondo", "Kumei", "Matsumoto",
  "Moriya", "Nakamura", "Ohta", "Tanaka", "Terence", "Ueda", "Wakame",
];
// 30 tiles (calm + shocked face per person) fill the grid
const TILES = MEMBERS.flatMap((n) => [n, `${n}-2`]);

/** WE ARE FUNTECH — the full-bleed grid of team-member photos. */
export function WeAreSlide(_props: { slide: Slide }) {
  return (
    <div className="absolute inset-0 grid grid-cols-6 grid-rows-5 gap-[0.3cqw] overflow-hidden">
      {TILES.map((t, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${t}-${i}`}
          src={asset(`/members/${t}.jpg`)}
          alt=""
          className="size-full object-cover"
          draggable={false}
        />
      ))}
    </div>
  );
}
