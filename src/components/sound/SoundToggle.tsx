"use client";

import { useSound } from "./SoundProvider";

/** Bottom-bar sound viz button — bars pulse while BGM plays. */
export function SoundToggle() {
  const { enabled, toggle } = useSound();
  return (
    <button
      onClick={toggle}
      aria-label={enabled ? "Mute sound" : "Play sound"}
      aria-pressed={enabled}
      className="pointer-events-auto flex size-11 items-center justify-center rounded bg-foreground text-background transition"
    >
      <span className="flex h-4 items-end gap-[2px]" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-[2px] rounded-full bg-current"
            style={{
              height: enabled ? "100%" : "35%",
              transformOrigin: "bottom",
              animation: enabled ? `sound-bar-pulse 0.9s ease-in-out ${i * 0.12}s infinite` : "none",
            }}
          />
        ))}
      </span>
    </button>
  );
}
