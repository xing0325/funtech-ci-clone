import { chromium } from 'playwright';
import fs from 'node:fs';
import { enterExperience } from './lib-enter.mjs';

const URL = 'https://ci.funtech.inc/en/logo-details';
const RES = 'docs/research';
fs.mkdirSync(`${RES}/blueprint`, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.setDefaultTimeout(60000);
await enterExperience(page, URL);

const data = await page.evaluate(() => {
  const R = el => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; };
  const vis = el => { const r = el.getBoundingClientRect(); return r.width > 1 && r.height > 1; };
  const findAll = txt => [...document.querySelectorAll('*')].filter(e => vis(e) && (e.textContent || '').trim().includes(txt));
  const smallest = txt => findAll(txt).sort((a, b) => { const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect(); return ra.width * ra.height - rb.width * rb.height; })[0];
  const walkUp = (el, pred) => { let e = el; while (e && e !== document.body && !pred(e)) e = e.parentElement; return e; };
  const FP = ['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','color','textTransform','textAlign'];
  const cs = (el, props) => { if (!el) return null; const s = getComputedStyle(el); const o = {}; props.forEach(p => o[p] = s[p]); return o; };
  const strip = el => { if (!el) return ''; const c = el.cloneNode(true); c.querySelectorAll('svg').forEach(s => { const vb = s.getAttribute('viewBox'); const cls = s.getAttribute('class'); s.innerHTML = `<!--paths:${s.querySelectorAll('path,circle,rect').length} vb:${vb}-->`; }); c.querySelectorAll('img').forEach(i => { i.removeAttribute('srcset'); }); return c.outerHTML; };

  const titleEl = smallest('Logo Details');
  const panel = walkUp(titleEl, e => R(e).w > 1050);
  const badgeEl = smallest('LOGO DETAILS');
  const card1 = walkUp(smallest('Play Technology'), e => R(e).w > 300 && R(e).h > 300);
  const card2 = walkUp(smallest('Star Creators'), e => R(e).w > 300 && R(e).h > 300);
  const card3 = walkUp(smallest('Ever-Evolving'), e => R(e).w > 300 && R(e).h > 300);
  const sidebar = walkUp(smallest('A MILLION-VOLT CREATIVE'), e => R(e).h > 600 && R(e).w < 340);
  const bottom = walkUp(smallest('MENU'), e => R(e).w > 1000);
  const label1 = smallest('DETAILS_01');
  const body1 = findAll('Boyish in impulse').sort((a,b)=>a.textContent.length-b.textContent.length)[0];

  return {
    measurements: {
      panel: R(panel), title: { rect: R(titleEl), cs: cs(titleEl, FP) },
      badge: { rect: R(badgeEl), cs: cs(badgeEl, FP) },
      label1: { rect: R(label1), cs: cs(label1, FP) },
      cardTitle1: { rect: R(smallest('Play Technology')), cs: cs(walkUp(smallest('Play Technology'), e=>e.tagName), FP) },
      body1: { rect: body1?R(body1):null, cs: cs(body1, FP) },
      card1: R(card1), card2: R(card2), card3: R(card3),
      sidebar: R(sidebar), bottom: R(bottom),
      panelStyle: cs(panel, ['background','backgroundColor','border','borderImage','boxShadow','borderRadius','padding']),
      panelBefore: (()=>{ const s=getComputedStyle(panel,'::before'); return { content:s.content, background:s.backgroundImage, border:s.borderImage }; })(),
    },
    html: {
      panel: strip(panel).slice(0, 20000),
      card1: strip(card1),
      card2: strip(card2),
      card3: strip(card3),
      sidebar: strip(sidebar).slice(0, 16000),
      bottom: strip(bottom),
      badge: strip(badgeEl),
    },
  };
});

fs.writeFileSync(`${RES}/measurements.json`, JSON.stringify(data.measurements, null, 2));
for (const [k, v] of Object.entries(data.html)) fs.writeFileSync(`${RES}/blueprint/${k}.html`, v || '');
console.log('MEASUREMENTS:', JSON.stringify(data.measurements, null, 2));
console.log('\nhtml files written:', Object.keys(data.html).map(k=>`${k}(${(data.html[k]||'').length})`).join(', '));

await browser.close();
console.log('done');
