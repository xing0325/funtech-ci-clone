import { chromium } from 'playwright';
const REF = 'docs/design-references';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.setDefaultTimeout(45000);
await page.goto('https://ci.funtech.inc/en/logo-details', { waitUntil: 'load', timeout: 60000 }).catch(e=>console.log('warn',e.message));
await page.waitForTimeout(3000);

const GATE_SEL = '[class*="z-[9999]"]';

// Dump gate subtree: elements with meaningful size, note cursor + roundness
const subtree = await page.evaluate((sel) => {
  const gate = document.querySelector(sel);
  if (!gate) return { error: 'no gate' };
  const out = [];
  gate.querySelectorAll('*').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width < 30 || r.height < 30) return;
    const cs = getComputedStyle(el);
    out.push({ tag: el.tagName, cls: (el.className?.toString?.()||'').slice(0,45), cursor: cs.cursor,
      radius: cs.borderRadius, cx: Math.round(r.left+r.width/2), cy: Math.round(r.top+r.height/2), w: Math.round(r.width), h: Math.round(r.height) });
  });
  return { count: out.length, els: out };
}, GATE_SEL);
console.log('GATE SUBTREE:', JSON.stringify(subtree, null, 2));

// Candidate circles: roundish, size ~150-320
const circles = (subtree.els||[]).filter(e => e.w>140 && e.w<340 && Math.abs(e.w-e.h) < 40);
console.log('CIRCLE CANDIDATES:', JSON.stringify(circles));

async function gatePresent() {
  return await page.locator(GATE_SEL).count() > 0 && await page.locator(GATE_SEL).first().isVisible().catch(()=>false);
}
console.log('gate present before:', await gatePresent());

// Click circles (prefer right/OFF = larger cx to avoid audio), via coordinate on the element center using mouse + also try handle
let settled = false;
const ordered = circles.sort((a,b)=> b.cx - a.cx); // OFF (right) first
for (const c of ordered) {
  // use elementFromPoint to get the actual top element and click it as a handle
  const clickedInfo = await page.evaluate(({x,y}) => {
    const el = document.elementFromPoint(x,y);
    return el ? { tag: el.tagName, cls: (el.className?.toString?.()||'').slice(0,40) } : null;
  }, {x:c.cx, y:c.cy});
  console.log(`clicking circle @${c.cx},${c.cy} topEl=`, JSON.stringify(clickedInfo));
  await page.mouse.click(c.cx, c.cy);
  await page.waitForTimeout(1500);
  // burst screenshots to catch transition
  for (let k=0;k<6;k++){ await page.screenshot({ path: `${REF}/trans-${c.cx}-${k}.png` }); await page.waitForTimeout(700); }
  if (!(await gatePresent())) { settled = true; console.log(`GATE GONE after clicking @${c.cx},${c.cy}`); break; }
}
console.log('settled:', settled);
await page.waitForTimeout(3000);
await page.screenshot({ path: `${REF}/gate3-final.png` });

// If settled, confirm content markers now visible & on top
const marker = await page.evaluate(() => {
  const el = document.elementFromPoint(720, 450);
  return el ? { tag: el.tagName, cls: (el.className?.toString?.()||'').slice(0,50), text:(el.textContent||'').trim().slice(0,30) } : null;
});
console.log('center element now:', JSON.stringify(marker));
await browser.close();
console.log('done');
