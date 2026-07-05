import { chromium } from 'playwright';
import fs from 'node:fs';

const URL = 'https://ci.funtech.inc/en/logo-details';
const OUT = 'docs/design-references';
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.setDefaultTimeout(45000);

await page.goto(URL, { waitUntil: 'load', timeout: 60000 }).catch(e => console.log('goto warn:', e.message));
await page.waitForTimeout(3000);

// Enumerate clickable candidates with rects
const candidates = await page.evaluate(() => {
  const out = [];
  for (const el of document.querySelectorAll('*')) {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (r.width < 8 || r.height < 8) continue;
    if (r.top < 0 || r.top > window.innerHeight) continue;
    const clickable = cs.cursor === 'pointer' || ['BUTTON','A'].includes(el.tagName) || el.getAttribute('role') === 'button' || el.onclick;
    if (!clickable) continue;
    out.push({
      tag: el.tagName,
      text: (el.textContent || '').trim().slice(0, 30),
      cls: (el.className?.toString?.() || '').slice(0, 60),
      cx: Math.round(r.left + r.width / 2),
      cy: Math.round(r.top + r.height / 2),
      w: Math.round(r.width), h: Math.round(r.height),
    });
  }
  // dedupe by center
  const seen = new Set();
  return out.filter(c => { const k = c.cx + ',' + c.cy; if (seen.has(k)) return false; seen.add(k); return true; });
});
console.log('CLICKABLE CANDIDATES:', JSON.stringify(candidates, null, 2));

const gateVisible = () => page.evaluate(() =>
  getComputedStyle(document.body).overflow === 'hidden' && document.documentElement.scrollHeight <= window.innerHeight + 50
);

console.log('gate locked before:', await gateVisible());

// Strategy: click the two audio-circle centers (from screenshot ~ x=590 and x=820 at y=490 in 1440-wide)
// but better: click each candidate that is a mid-screen circle-ish element
const midCircles = candidates.filter(c => c.cy > 350 && c.cy < 620 && c.w > 100 && c.w < 360);
console.log('mid circle candidates:', JSON.stringify(midCircles));

let dismissed = false;
const tryTargets = [...midCircles.map(c => [c.cx, c.cy])];
for (const [x, y] of tryTargets) {
  await page.mouse.click(x, y);
  await page.waitForTimeout(3500);
  if (!(await gateVisible())) { dismissed = true; console.log(`dismissed by click @ ${x},${y}`); break; }
}
// fallback: click hard-coded ON circle center in a 1440x900 frame
if (!dismissed) {
  for (const [x, y] of [[600, 500], [840, 500], [720, 500]]) {
    await page.mouse.click(x, y);
    await page.waitForTimeout(3500);
    if (!(await gateVisible())) { dismissed = true; console.log(`dismissed by fallback click @ ${x},${y}`); break; }
  }
}
console.log('DISMISSED:', dismissed);
await page.waitForTimeout(3000);
await page.screenshot({ path: `${OUT}/03-post-gate.png` });

const post = await page.evaluate(() => ({
  scrollHeight: document.documentElement.scrollHeight,
  innerHeight: window.innerHeight,
  bodyOverflow: getComputedStyle(document.body).overflow,
  htmlOverflow: getComputedStyle(document.documentElement).overflow,
  scrollWidth: document.documentElement.scrollWidth,
}));
console.log('POST:', JSON.stringify(post));

// Scroll sequence
const shots = [];
for (let i = 0; i < 12; i++) {
  await page.mouse.wheel(0, 700);
  await page.waitForTimeout(700);
  const y = await page.evaluate(() => window.scrollY);
  const p = `${OUT}/scroll-${String(i).padStart(2,'0')}.png`;
  await page.screenshot({ path: p });
  shots.push({ i, scrollY: y });
}
console.log('SCROLL SHOTS:', JSON.stringify(shots));

await browser.close();
console.log('done');
