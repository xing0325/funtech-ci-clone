"use client";

import { useEffect, useRef } from "react";

/**
 * The site's signature cursor: a white pen glyph that leaves a fading red-ink trail.
 * Desktop only (fine pointer). Trail is drawn on a full-viewport canvas; the pen is a
 * DOM node following the mouse. Hides the native cursor while mounted.
 */
export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const penRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const canvas = canvasRef.current!;
    const pen = penRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const trail: { x: number; y: number; t: number }[] = [];
    let mx = w / 2, my = h / 2, moved = false;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; moved = true; };
    window.addEventListener("mousemove", onMove);

    const keyColor = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--color-key").trim() || "#ff481b";
    let color = keyColor();
    const themeObs = new MutationObserver(() => (color = keyColor()));
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const LIFE = 450; // ms trail lifetime
    let raf = 0;
    const tick = () => {
      const now = performance.now();
      if (moved) trail.push({ x: mx, y: my, t: now });
      while (trail.length && now - trail[0].t > LIFE) trail.shift();

      ctx.clearRect(0, 0, w, h);
      if (trail.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = color;
        for (let i = 1; i < trail.length; i++) {
          const a = trail[i], b = trail[i - 1];
          const age = (now - a.t) / LIFE; // 0 new → 1 old
          ctx.globalAlpha = Math.max(0, 1 - age);
          ctx.lineWidth = 8 * (1 - age) + 1.5;
          ctx.beginPath();
          ctx.moveTo(b.x, b.y);
          ctx.lineTo(a.x, a.y);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
      pen.style.transform = `translate(${mx}px, ${my}px)`;
      pen.style.opacity = moved ? "1" : "0";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    document.documentElement.classList.add("cursor-hidden");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      themeObs.disconnect();
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[9998]" aria-hidden="true" />
      <div ref={penRef} className="pointer-events-none fixed left-0 top-0 z-[9999]" style={{ opacity: 0, willChange: "transform" }} aria-hidden="true">
        {/* white marker/pen glyph — nib sits at the cursor origin, body up-and-right */}
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ transform: "translate(-3px, -3px)" }}>
          <path d="M4 36 L8 25 L27 6 L34 13 L15 32 Z" fill="#f2eeeb" stroke="#1c1d1e" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M27 6 L34 13" stroke="#1c1d1e" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M8 25 L15 32" stroke="#1c1d1e" strokeWidth="1.2" />
          <path d="M4 36 L8.5 30" stroke="var(--color-key)" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </div>
    </>
  );
}
