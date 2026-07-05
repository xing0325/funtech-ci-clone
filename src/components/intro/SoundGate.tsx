"use client";

function EqIcon({ muted = false }: { muted?: boolean }) {
  return (
    <svg viewBox="0 0 28 22" className="h-6 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="4" y1="14" x2="4" y2="18" />
      <line x1="9" y1="9" x2="9" y2="18" />
      <line x1="14" y1="4" x2="14" y2="18" />
      <line x1="19" y1="11" x2="19" y2="18" />
      <line x1="24" y1="7" x2="24" y2="18" />
      {muted && <line x1="3" y1="4" x2="25" y2="19" strokeWidth="2" />}
    </svg>
  );
}

export function SoundGate({ onEnter }: { onEnter: (sound: boolean) => void }) {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-[8vh] bg-background px-6">
      <p className="text-noise-edge text-center font-key text-[clamp(20px,4.4vw,32px)] uppercase leading-[1.3] tracking-wide text-foreground">
        For the best experience.
        <br />
        Please turn on sound.
      </p>

      <div className="flex items-center gap-6">
        <button
          onClick={() => onEnter(true)}
          className="flex aspect-square w-[clamp(120px,22vw,180px)] flex-col items-center justify-center gap-3 rounded-full bg-key text-background transition-transform duration-300 hover:scale-[0.96]"
        >
          <EqIcon />
          <span className="text-[13px] font-bold tracking-[0.15em]">ON</span>
        </button>
        <button
          onClick={() => onEnter(false)}
          className="flex aspect-square w-[clamp(120px,22vw,180px)] flex-col items-center justify-center gap-3 rounded-full border border-key text-foreground transition-transform duration-300 hover:scale-[0.96]"
        >
          <EqIcon muted />
          <span className="text-[13px] font-bold tracking-[0.15em]">OFF</span>
        </button>
      </div>
    </div>
  );
}
