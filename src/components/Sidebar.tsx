"use client";

import { useEffect, useRef } from "react";
import { SLIDES } from "@/data/deck";
import { asset } from "@/lib/asset";
import { useDeck } from "@/components/deck/DeckContext";

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 15l6-6 6 6" />
    </svg>
  );
}

export function Sidebar() {
  const { index, setIndex, go } = useDeck();
  const activeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [index]);

  const scrollList = (dir: number) => scrollRef.current?.scrollBy({ top: dir * 220, behavior: "smooth" });

  return (
    <aside className="relative z-20 hidden h-full w-[184px] shrink-0 flex-col py-3 pl-6 pr-2 lg:flex">
      <button onClick={() => scrollList(-1)} className="mb-2 ml-auto flex size-8 items-center justify-center rounded-sm border border-foreground/20 text-foreground/70 transition hover:text-foreground" aria-label="Scroll up">
        <Chevron className="size-4" />
      </button>

      <div ref={scrollRef} className="no-scrollbar flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6">
          {SLIDES.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.n}
                ref={active ? activeRef : undefined}
                onClick={() => setIndex(i)}
                className="group block w-full text-left"
                style={{ opacity: active ? 1 : 0.32, transition: "opacity 300ms linear" }}
              >
                <span className="block w-full origin-center transform-gpu transition duration-300 group-hover:scale-95">
                  <span className="flex min-w-0 flex-col gap-1">
                    <div className="aspect-video w-full shrink-0 overflow-hidden rounded-[2px] bg-key">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt="" draggable={false} className="size-full object-cover" src={asset(`/thumbnails/en/${s.thumb}.webp`)} />
                    </div>
                    <p className="flex min-w-0 items-baseline justify-start gap-1 text-left text-xs font-semibold leading-none">
                      <span className="shrink-0 text-key">{s.n}</span>
                      <span className="min-w-0 truncate text-foreground">{s.title}</span>
                    </p>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-2 ml-auto flex gap-1">
        <button onClick={() => scrollList(1)} className="flex size-8 items-center justify-center rounded-sm border border-foreground/20 text-foreground/70 transition hover:text-foreground" aria-label="Scroll down">
          <Chevron className="size-4 rotate-180" />
        </button>
        <button onClick={() => go(1)} className="flex size-8 items-center justify-center rounded-sm border border-foreground/20 text-foreground/70 transition hover:text-foreground" aria-label="Next">
          <Chevron className="size-4 rotate-90" />
        </button>
      </div>
    </aside>
  );
}
