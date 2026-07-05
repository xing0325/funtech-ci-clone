import { chromium } from 'playwright';
const REF = 'docs/design-references';
const GATE = '[class*="z-[9999]"]';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.setDefaultTimeout(60000);
await page.goto('https://ci.funtech.inc/en/logo-details', { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(e=>console.log('warn',e.message));

function probe() {
  return page.evaluate((sel) => {
    const gate = document.querySelector(sel);
    if (!gate) return { phase: 'no-gate' };
    const txt = (gate.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 60);
    const circles = [...gate.querySelectorAll('*')].map(el => {
      const r = el.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), cx: Math.round(r.left + r.width/2), cy: Math.round(r.top + r.height/2), tag: el.tagName };
    }).filter(e => e.w > 170 && e.w < 360 && Math.abs(e.w - e.h) < 60);
    let phase = 'other';
    if (/%/.test(txt)) phase = 'preload';
    else if (circles.length >= 2) phase = 'soundgate';
    return { phase, txt, circles };
  }, GATE);
}

// Timeline
const timeline = [];
let soundgate = null;
for (let i = 0; i < 70; i++) {
  const p = await probe();
  timeline.push({ t: i * 0.6, phase: p.phase, txt: p.txt });
  if (p.phase === 'soundgate') { soundgate = p; break; }
  if (p.phase === 'no-gate') { console.log('gate already gone'); break; }
  await page.waitForTimeout(600);
}
console.log('TIMELINE:', JSON.stringify(timeline.filter((x,i)=> i===0 || x.phase!==timeline[i-1].phase || i===timeline.length-1), null, 2));
console.log('SOUNDGATE:', JSON.stringify(soundgate));
await page.screenshot({ path: `${REF}/enter-soundgate.png` });

if (soundgate && soundgate.circles.length >= 2) {
  // click OFF = rightmost circle
  const off = soundgate.circles.sort((a,b)=>b.cx-a.cx)[0];
  console.log('clicking OFF circle @', off.cx, off.cy);
  await page.mouse.click(off.cx, off.cy);
  // wait & log until gate gone
  for (let i = 0; i < 25; i++) {
    const g = await page.locator(GATE).count();
    if (g === 0) { console.log(`gate removed at +${(i*0.5).toFixed(1)}s`); break; }
    const vis = await page.locator(GATE).first().isVisible().catch(()=>false);
    if (!vis) { console.log(`gate hidden at +${(i*0.5).toFixed(1)}s`); break; }
    await page.waitForTimeout(500);
  }
  // capture entrance transition burst
  for (let k = 0; k < 8; k++) { await page.screenshot({ path: `${REF}/enter-trans-${k}.png` }); await page.waitForTimeout(600); }
}

await page.waitForTimeout(2000);
await page.screenshot({ path: `${REF}/enter-settled.png` });
const center = await page.evaluate(() => { const el = document.elementFromPoint(720, 450); return el ? { tag: el.tagName, cls:(el.className?.toString?.()||'').slice(0,40), text:(el.textContent||'').trim().slice(0,30) } : null; });
console.log('CENTER now:', JSON.stringify(center));
await browser.close();
console.log('done');
