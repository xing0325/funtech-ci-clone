"use client";

import { useEffect, useState } from "react";

type Theme = "fun" | "volt" | "breaker";

/** Reactively reads the current `data-theme` on <html> (set by ThemePills). */
export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>("fun");
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setTheme((root.dataset.theme as Theme) || "fun");
    read();
    const obs = new MutationObserver(read);
    obs.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);
  return theme;
}
