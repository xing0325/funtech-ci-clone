// Reusable "enter the experience" recipe for ci.funtech.inc deck pages.
export const GATE = '[class*="z-[9999]"]';

export async function enterExperience(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(e => console.log('goto warn:', e.message));
  // Wait through preloader until the sound gate (2 big circular <button>s) appears
  let sg = null;
  for (let i = 0; i < 90; i++) {
    sg = await page.evaluate((sel) => {
      const gate = document.querySelector(sel);
      if (!gate) return { phase: 'no-gate' };
      const txt = (gate.innerText || '').replace(/\s+/g, ' ');
      const circles = [...gate.querySelectorAll('button')].map(b => { const r = b.getBoundingClientRect(); return { cx: Math.round(r.left + r.width/2), cy: Math.round(r.top + r.height/2), w: Math.round(r.width) }; }).filter(e => e.w > 150);
      return { phase: circles.length >= 2 ? 'soundgate' : (/%/.test(txt) ? 'preload' : 'other'), circles };
    }, GATE);
    if (sg.phase === 'soundgate' || sg.phase === 'no-gate') break;
    await page.waitForTimeout(600);
  }
  if (sg && sg.phase === 'soundgate' && sg.circles.length >= 2) {
    const off = sg.circles.sort((a, b) => b.cx - a.cx)[0]; // rightmost = OFF (no audio)
    await page.mouse.click(off.cx, off.cy);
    for (let i = 0; i < 30; i++) { if (await page.locator(GATE).count() === 0) break; await page.waitForTimeout(500); }
  }
  await page.waitForTimeout(4500); // let entrance transition settle
  return sg ? sg.phase : 'unknown';
}
