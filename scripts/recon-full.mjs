import { chromium } from 'playwright';
import fs from 'node:fs';

const URL = 'https://ci.funtech.inc/en/logo-details';
const REF = 'docs/design-references';
const RES = 'docs/research';
fs.mkdirSync(REF, { recursive: true });
fs.mkdirSync(RES, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.setDefaultTimeout(45000);

const mediaReqs = [];
page.on('response', r => {
  const u = r.url();
  if (/\.(woff2?|ttf|otf|mp3|wav|ogg|m4a|mp4|webm|png|jpe?g|webp|avif|svg|gif)(\?|$)/i.test(u)) {
    mediaReqs.push({ url: u, type: r.request().resourceType(), status: r.status() });
  }
});

console.log('== goto ==');
await page.goto(URL, { waitUntil: 'load', timeout: 60000 }).catch(e => console.log('goto warn:', e.message));
await page.waitForTimeout(2500);

// Enter recipe: click ON/OFF audio circle coordinates (centered pair ~41% and 57% width, 55% height)
const vw = 1440, vh = 900;
for (const [x, y] of [[Math.round(vw*0.41), Math.round(vh*0.55)], [Math.round(vw*0.585), Math.round(vh*0.55)], [vw/2, Math.round(vh*0.55)]]) {
  await page.mouse.click(x, y).catch(()=>{});
  await page.waitForTimeout(1500);
}
console.log('== waiting for entrance transition to settle ==');
await page.waitForTimeout(7000);

// ---- Design tokens: CSS custom properties from all same-origin stylesheets ----
const tokens = await page.evaluate(() => {
  const vars = {};
  const fontFaces = [];
  const keyframes = [];
  for (const sheet of document.styleSheets) {
    let rules; try { rules = sheet.cssRules; } catch (e) { continue; }
    for (const rule of rules) {
      if (rule.style) for (const p of rule.style) { if (p.startsWith('--')) { const v = rule.style.getPropertyValue(p).trim(); if (v) vars[p] = v; } }
      if (rule.constructor.name === 'CSSFontFaceRule' || rule.type === 5) fontFaces.push(rule.cssText.slice(0, 300));
      if (rule.constructor.name === 'CSSKeyframesRule' || rule.type === 7) keyframes.push(rule.name);
    }
  }
  return { vars, fontFaces, keyframes: [...new Set(keyframes)] };
});
fs.writeFileSync(`${RES}/tokens.json`, JSON.stringify(tokens, null, 2));
console.log('TOKENS vars:', Object.keys(tokens.vars).length, 'fontFaces:', tokens.fontFaces.length, 'keyframes:', tokens.keyframes.length);
console.log('VARS:', JSON.stringify(tokens.vars, null, 2));
console.log('KEYFRAMES:', JSON.stringify(tokens.keyframes));

// ---- Key element computed styles (fonts/colors) ----
const probes = await page.evaluate(() => {
  const pick = (el) => { if (!el) return null; const cs = getComputedStyle(el); return {
    text: (el.textContent||'').trim().slice(0,40),
    fontFamily: cs.fontFamily, fontSize: cs.fontSize, fontWeight: cs.fontWeight, lineHeight: cs.lineHeight, letterSpacing: cs.letterSpacing,
    color: cs.color, backgroundColor: cs.backgroundColor,
  }; };
  const byText = (t) => [...document.querySelectorAll('*')].find(e => e.children.length===0 && (e.textContent||'').trim() === t);
  return {
    body: pick(document.body),
    bigTitle: pick(byText('Logo Details')),
    cardTitle: pick(byText('Star Creators')),
    cardLabel: pick(byText('DETAILS_02')),
    bodyCopy: pick([...document.querySelectorAll('p')].find(p => (p.textContent||'').includes('star creators who shine'))),
  };
});
fs.writeFileSync(`${RES}/probes.json`, JSON.stringify(probes, null, 2));
console.log('PROBES:', JSON.stringify(probes, null, 2));

// ---- Asset discovery ----
const assets = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll('img')].map(img => ({ src: img.currentSrc || img.src, alt: img.alt, w: img.naturalWidth, h: img.naturalHeight }));
  const bgs = [...document.querySelectorAll('*')].map(el => getComputedStyle(el).backgroundImage).filter(b => b && b !== 'none' && b.includes('url('));
  const videos = [...document.querySelectorAll('video')].map(v => ({ src: v.currentSrc || v.src || v.querySelector('source')?.src, poster: v.poster }));
  const audios = [...document.querySelectorAll('audio')].map(a => ({ src: a.currentSrc || a.src || a.querySelector('source')?.src }));
  const svgCount = document.querySelectorAll('svg').length;
  const inlineSvgs = [...document.querySelectorAll('svg')].slice(0, 40).map(s => ({ w: s.getBoundingClientRect().width|0, h: s.getBoundingClientRect().height|0, cls: s.getAttribute('class')?.slice(0,40)||'', viewBox: s.getAttribute('viewBox')||'' }));
  return { imgs, bgs: [...new Set(bgs)], videos, audios, svgCount, inlineSvgs };
});
fs.writeFileSync(`${RES}/assets.json`, JSON.stringify(assets, null, 2));
console.log('ASSETS imgs:', assets.imgs.length, 'bgs:', assets.bgs.length, 'videos:', assets.videos.length, 'audios:', assets.audios.length, 'svgs:', assets.svgCount);

// ---- Full HTML of the document (settled) ----
const html = await page.content();
fs.writeFileSync(`${RES}/settled.html`, html);
console.log('HTML length:', html.length);

// ---- Screenshots: desktop settled ----
await page.screenshot({ path: `${REF}/desktop-1440.png` });

// tablet
await page.setViewportSize({ width: 768, height: 1024 });
await page.waitForTimeout(1500);
await page.screenshot({ path: `${REF}/tablet-768.png` });

// mobile
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(1500);
await page.screenshot({ path: `${REF}/mobile-390.png` });
await page.screenshot({ path: `${REF}/mobile-390-full.png`, fullPage: true });

// media requests
fs.writeFileSync(`${RES}/media-requests.json`, JSON.stringify(mediaReqs, null, 2));
console.log('MEDIA REQUESTS:', mediaReqs.length);
const audio = mediaReqs.filter(m => /\.(mp3|wav|ogg|m4a)/i.test(m.url));
console.log('AUDIO:', JSON.stringify(audio, null, 2));

await browser.close();
console.log('done');
