"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { asset } from "@/lib/asset";

interface SoundCtx {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  toggle: () => void;
}

const Ctx = createContext<SoundCtx>({ enabled: false, setEnabled: () => {}, toggle: () => {} });
export const useSound = () => useContext(Ctx);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (enabled) {
      a.volume = 0.5;
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  }, [enabled]);

  return (
    <Ctx.Provider value={{ enabled, setEnabled, toggle: () => setEnabled((v) => !v) }}>
      {children}
      <audio ref={audioRef} src={asset("/sound/bgm.mp3")} loop preload="auto" />
    </Ctx.Provider>
  );
}
