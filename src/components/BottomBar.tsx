"use client";

import { SoundToggle } from "@/components/sound/SoundToggle";
import { SLIDES } from "@/data/deck";
import { useDeck } from "@/components/deck/DeckContext";

const Arrow = ({ dir = "left" }: { dir?: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
  </svg>
);

function SideLink({ n, title, dir, onClick }: { n: string; title: string; dir: "left" | "right"; onClick: () => void }) {
  const square = (
    <span className="flex size-11 shrink-0 items-center justify-center rounded bg-key text-background transition group-hover:brightness-110">
      <Arrow dir={dir} />
    </span>
  );
  return (
    <button onClick={onClick} className="group flex items-center gap-3">
      {dir === "left" && square}
      <span className="hidden font-key text-[15px] leading-none tracking-[0.04em] sm:inline">
        <span className="text-key">{n}.</span> <span className="text-foreground">{title}</span>
      </span>
      {dir === "right" && square}
    </button>
  );
}

export function BottomBar() {
  const { index, go } = useDeck();
  const prev = SLIDES[(index - 1 + SLIDES.length) % SLIDES.length];
  const next = SLIDES[(index + 1) % SLIDES.length];

  return (
    <div className="absolute inset-x-0 bottom-0 z-30 h-16 px-2">
      <div className="relative flex h-full items-center justify-between">
        <SideLink n={prev.n} title={prev.title} dir="left" onClick={() => go(-1)} />
        <SideLink n={next.n} title={next.title} dir="right" onClick={() => go(1)} />
      </div>

      {/* centered control cluster */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2">
        <button className="pointer-events-auto flex h-11 items-center gap-2 rounded bg-foreground/10 px-4 text-[15px] font-semibold text-foreground transition hover:bg-foreground/15">
          PDF
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
          </svg>
        </button>

        <button className="group pointer-events-auto flex h-11 w-40 items-center justify-center gap-2 rounded bg-key text-[15px] font-semibold tracking-[0.05em] text-background transition hover:scale-95">
          MENU
          <span className="inline-flex transition-transform duration-300 group-hover:rotate-90" aria-hidden="true">
            <svg viewBox="0 0 9 9" width="9" height="9" fill="currentColor">
              <circle cx="2" cy="2" r="1.3" /><circle cx="7" cy="2" r="1.3" /><circle cx="2" cy="7" r="1.3" /><circle cx="7" cy="7" r="1.3" />
            </svg>
          </span>
        </button>

        <SoundToggle />

        <div className="pointer-events-auto flex overflow-hidden rounded border border-foreground/20 text-[13px] font-semibold">
          <span className="px-3 py-2 leading-none text-foreground/45">JP</span>
          <span className="bg-foreground px-3 py-2 leading-none text-background">EN</span>
        </div>
      </div>
    </div>
  );
}
