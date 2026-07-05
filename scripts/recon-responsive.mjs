import { chromium } from 'playwright';
import fs from 'node:fs';
import { enterExperience } from './lib-enter.mjs';
const REF = 'docs/design-references';

for (const [w, h, name] of [[390, 844, 'orig-mobile-390'], [768, 1024, 'orig-tablet-768']]) {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  page.setDefaultTimeout(60000);
  await enterExperience(page, 'https://ci.funtech.inc/en/logo-details');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${REF}/${name}.png` });
  // also measure layout: is sidebar visible? cards stacked?
  const info = await page.evaluate(() => ({
    scrollH: document.documentElement.scrollHeight,
    innerH: window.innerHeight,
    bodyOverflow: getComputedStyle(document.body).overflow,
    // container stage size
    stage: (() => { const s = document.querySelector('svg.logo-detail-svg-key-transition'); if (!s) return null; let e = s; while (e && getComputedStyle(e).containerType === 'normal') e = e.parentElement; const r = e?.getBoundingClientRect(); return r ? { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y) } : null; })(),
    cardRects: [...document.querySelectorAll('svg.logo-detail-svg-key-transition')].map(s => { const r = s.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width) }; }),
  }));
  console.log(name, JSON.stringify(info));
  await browser.close();
}
console.log('done');
