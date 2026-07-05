import { chromium } from 'playwright';
import fs from 'node:fs';
const REF = 'docs/design-references';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.setDefaultTimeout(45000);
await page.goto('https://ci.funtech.inc/en/logo-details', { waitUntil: 'load', timeout: 60000 }).catch(e=>console.log('warn',e.message));
await page.waitForTimeout(3000);

// Dump all buttons + the ancestor chain at the ON-circle point
const dump = await page.evaluate(() => {
  const btns = [...document.querySelectorAll('button')].map((b,i) => {
    const r = b.getBoundingClientRect();
    return { i, aria: b.getAttribute('aria-label'), text: (b.textContent||'').trim().slice(0,20),
      cls: (b.className?.toString?.()||'').slice(0,50), cx: Math.round(r.left+r.width/2), cy: Math.round(r.top+r.height/2), w: Math.round(r.width), h: Math.round(r.height), hasSvg: !!b.querySelector('svg') };
  });
  const chain = [];
  let el = document.elementFromPoint(602, 503);
  while (el && chain.length < 10) { const cs = getComputedStyle(el); chain.push({ tag: el.tagName, cls: (el.className?.toString?.()||'').slice(0,40), pos: cs.position, z: cs.zIndex }); el = el.parentElement; }
  return { btns, chain };
});
console.log('BUTTONS:', JSON.stringify(dump.btns, null, 2));
console.log('CHAIN@ON:', JSON.stringify(dump.chain, null, 2));

// distinctive settled marker: the gate root element. Grab top element at ON point and remember it.
const gateGone = async () => await page.evaluate(() => {
  const el = document.elementFromPoint(602, 503);
  // if the top element at the ON-circle location is now huge/main content or body, gate is gone.
  if (!el) return true;
  const t = (el.textContent||'');
  // gate contains no 'Logo Details'/'Play Technology'; settled content at this point would.
  return !document.querySelector('button[aria-label*="sound" i], button[aria-label*="ON" i]') ? null : false;
});

// Click the big circular buttons via element handle
const bigBtns = dump.btns.filter(b => b.w > 140 && b.h > 140);
console.log('BIG BUTTONS (circles):', JSON.stringify(bigBtns));

let settled = false;
for (const b of bigBtns) {
  const handle = await page.$$('button');
  try {
    await handle[b.i].click({ timeout: 4000 });
    console.log(`clicked button #${b.i} (aria=${b.aria})`);
  } catch (e) { console.log('click err', e.message); continue; }
  await page.waitForTimeout(6000);
  await page.screenshot({ path: `${REF}/gate2-after-btn${b.i}.png` });
  // check via screenshot pixel: is center-top now content? sample if gate text still there by checking a known gate button still exists
  const stillGate = await page.evaluate(() => {
    const b2 = [...document.querySelectorAll('button')].filter(x => { const r=x.getBoundingClientRect(); return r.width>140 && r.height>140; });
    return b2.length >= 2; // gate shows 2 big circles
  });
  console.log(`after btn#${b.i}: stillGate=${stillGate}`);
  if (!stillGate) { settled = true; console.log(`SETTLED after clicking button #${b.i}`); break; }
}
console.log('FINAL settled:', settled);
await page.screenshot({ path: `${REF}/gate2-final.png` });
await browser.close();
console.log('done');
