"use client";

import { useState } from "react";

const THEMES = [
  { key: "volt", emoji: "⚡️" },
  { key: "breaker", emoji: "🏆" },
  { key: "fun", emoji: "🎉" },
] as const;

/** Top-right theme switcher — swaps the site-wide accent (volt / breaker / fun). */
export function ThemePills() {
  const [active, setActive] = useState<string>("fun");

  return (
    <div className="absolute right-2 top-4 z-30 flex items-center gap-1 rounded-full border border-key/60 p-1">
      {THEMES.map((t) => (
        <button
          key={t.key}
          onClick={() => {
            setActive(t.key);
            document.documentElement.setAttribute("data-theme", t.key);
          }}
          aria-label={`${t.key} theme`}
          className={`flex size-8 cursor-pointer items-center justify-center rounded-full text-[17px] leading-none transition ${
            active === t.key ? "bg-key/25" : "opacity-60 hover:opacity-100"
          }`}
        >
          <span aria-hidden="true">{t.emoji}</span>
        </button>
      ))}
    </div>
  );
}
