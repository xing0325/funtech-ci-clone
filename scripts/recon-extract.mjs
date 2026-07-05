import { chromium } from 'playwright';
import fs from 'node:fs';
import { enterExperience } from './lib-enter.mjs';

const URL = 'https://ci.funtech.inc/en/logo-details';
const REF = 'docs/design-references';
const RES = 'docs/research';
fs.mkdirSync(`${RES}/svgs`, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
page.setDefaultTimeout(60000);

const media = new Set();
page.on('response', r => { const u = r.url(); if (/\.(woff2?|mp3|wav|mp4|webm|png|jpe?g|webp|avif|svg|gif)(\?|$)/i.test(u)) media.add(u.split('?')[0]); });

const phase = await enterExperience(page, URL);
console.log('entered via phase:', phase);

// clean screenshot to confirm
await page.screenshot({ path: `${REF}/clean-desktop.png` });

// settled HTML
fs.writeFileSync(`${RES}/settled2.html`, await page.content());

// assets in settled DOM
const assets = await page.evaluate(() => {
  const abs = (s) => { try { return new URL(s, location.href).href.split('?')[0]; } catch { return s; } };
  return {
    imgs: [...document.querySelectorAll('img')].map(i => ({ src: abs(i.currentSrc || i.src), alt: i.alt, w: i.naturalWidth, h: i.naturalHeight,
      rect: (r => ({ x: r.x|0, y: r.y|0, w: r.width|0, h: r.height|0 }))(i.getBoundingClientRect()) })),
    bgs: [...new Set([...document.querySelectorAll('*')].map(el => getComputedStyle(el).backgroundImage).filter(b => b && b.includes('url(')))]
      .map(b => (b.match(/url\(["']?([^"')]+)/)||[])[1]).filter(Boolean).map(abs),
    videos: [...document.querySelectorAll('video')].map(v => ({ src: abs(v.currentSrc || v.src || v.querySelector('source')?.src || '') })),
    audios: [...document.querySelectorAll('audio')].map(a => ({ src: abs(a.currentSrc || a.src || a.querySelector('source')?.src || '') })),
  };
});
fs.writeFileSync(`${RES}/assets2.json`, JSON.stringify(assets, null, 2));
console.log('imgs:', assets.imgs.length, 'bgs:', assets.bgs.length);
console.log('IMG SRCS:', JSON.stringify([...new Set(assets.imgs.map(i=>i.src))], null, 2));
console.log('BG SRCS:', JSON.stringify(assets.bgs, null, 2));

// inline SVGs (>=40px) — save outerHTML + manifest
const svgManifest = await page.evaluate(() => {
  const out = [];
  [...document.querySelectorAll('svg')].forEach((s, idx) => {
    const r = s.getBoundingClientRect();
    if (r.width < 24 || r.height < 24) return;
    out.push({ idx, w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y), viewBox: s.getAttribute('viewBox') || '', cls: (s.getAttribute('class')||'').slice(0,40), html: s.outerHTML });
  });
  return out;
});
const manifest = svgManifest.map(({ html, ...m }) => m);
fs.writeFileSync(`${RES}/svg-manifest.json`, JSON.stringify(manifest, null, 2));
svgManifest.forEach(s => fs.writeFileSync(`${RES}/svgs/svg-${String(s.idx).padStart(2,'0')}_${s.w}x${s.h}.svg`, s.html));
console.log('inline svgs saved:', svgManifest.length);
console.log('SVG MANIFEST:', JSON.stringify(manifest, null, 2));

// media list
fs.writeFileSync(`${RES}/net-media.json`, JSON.stringify([...media].sort(), null, 2));
const imgMedia = [...media].filter(u => /\.(png|jpe?g|webp|avif|gif)$/i.test(u) && !/_next\/static/.test(u));
console.log('NON-FONT IMAGE MEDIA:', JSON.stringify(imgMedia.sort(), null, 2));

await browser.close();
console.log('done');
