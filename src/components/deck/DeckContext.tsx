"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { SLIDES } from "@/data/deck";

interface DeckState {
  index: number;
  setIndex: (i: number) => void;
  go: (delta: number) => void;
}

const Ctx = createContext<DeckState | null>(null);

export function DeckProvider({ children, initial = 8 }: { children: React.ReactNode; initial?: number }) {
  const [index, setIndex] = useState(initial);
  const go = useCallback((delta: number) => {
    setIndex((i) => (i + delta + SLIDES.length) % SLIDES.length);
  }, []);
  return <Ctx.Provider value={{ index, setIndex, go }}>{children}</Ctx.Provider>;
}

export function useDeck() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useDeck must be used inside <DeckProvider>");
  return c;
}
