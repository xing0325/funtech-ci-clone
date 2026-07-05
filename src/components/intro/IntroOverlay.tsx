"use client";

import { useCallback, useEffect, useState } from "react";
import { useSound } from "@/components/sound/SoundProvider";
import { Preloader } from "./Preloader";
import { SoundGate } from "./SoundGate";

type Phase = "preload" | "gate" | "done";

export function IntroOverlay() {
  const { setEnabled } = useSound();
  const [phase, setPhase] = useState<Phase>("preload");

  useEffect(() => {
    const skip = new URLSearchParams(window.location.search).has("skipIntro") || sessionStorage.getItem("funtech-entered") === "1";
    if (skip) setPhase("done");
  }, []);

  const enter = useCallback(
    (sound: boolean) => {
      setEnabled(sound);
      try { sessionStorage.setItem("funtech-entered", "1"); } catch {}
      setPhase("done");
    },
    [setEnabled],
  );

  if (phase === "done") return null;
  if (phase === "preload") return <Preloader onDone={() => setPhase("gate")} />;
  return <SoundGate onEnter={enter} />;
}
