import { chromium } from 'playwright';
import fs from 'node:fs';
import { enterExperience } from './lib-enter.mjs';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.setDefaultTimeout(60000);
await enterExperience(page, 'https://ci.funtech.inc/en/logo-details');

const out = await page.evaluate(() => {
  const R = el => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; };
  const CS = (el, ps) => { if (!el) return null; const s = getComputedStyle(el); const o = {}; ps.forEach(p => o[p] = s[p]); return o; };
  const cls = el => el ? (el.className?.toString?.() || '').slice(0, 70) : null;
  const txt = el => el ? (el.textContent || '').trim().slice(0, 30) : null;

  // container-type root (for cqw): walk up from a card svg
  const cardSvgs = [...document.querySelectorAll('svg.logo-detail-svg-key-transition')];
  const cardBoxes = cardSvgs.map(svg => {
    // svg -> inner(relative size-full) -> card box (the bordered sized element)
    let box = svg.parentElement; // inner
    // climb until width differs (the actual sized card wrapper)
    const chain = [];
    let e = svg;
    for (let i = 0; i < 6 && e; i++) { chain.push({ cls: cls(e), rect: R(e), containerType: getComputedStyle(e).containerType, border: getComputedStyle(e).borderWidth }); e = e.parentElement; }
    return chain;
  });

  // container-type element
  let container = null;
  if (cardSvgs[0]) { let e = cardSvgs[0]; while (e && e !== document.body) { if (getComputedStyle(e).containerType !== 'normal') { container = e; break; } e = e.parentElement; } }

  // title: largest font-size element whose text is 'Logo Details'
  const titles = [...document.querySelectorAll('*')].filter(e => (e.textContent || '').trim() === 'Logo Details' && e.getBoundingClientRect().width > 50);
  const titleEl = titles.sort((a, b) => parseFloat(getComputedStyle(b).fontSize) - parseFloat(getComputedStyle(a).fontSize))[0];

  // badge near top: element containing 'LOGO DETAILS' with elevon and y<200
  const badge = [...document.querySelectorAll('*')].filter(e => { const t = (e.textContent || '').trim(); const r = e.getBoundingClientRect(); return t.startsWith('09') && t.includes('LOGO DETAILS') && r.y < 220 && r.width < 400 && r.width > 60; }).sort((a,b)=>a.getBoundingClientRect().width-b.getBoundingClientRect().width)[0];

  // callouts: Fun-kun labels
  const funkun = [...document.querySelectorAll('*')].filter(e => /Fun-kun/.test((e.textContent||'')) && e.children.length===0).map(e=>({ text: txt(e), rect: R(e), cs: CS(e,['fontFamily','fontSize','color','fontWeight']) }));

  // top pills container: parent of the 3 emoji buttons
  const emojiBtns = [...document.querySelectorAll('button')].filter(b => /[⚡🏆🎉]/.test(b.textContent||''));
  const pills = emojiBtns[0] ? emojiBtns[0].parentElement : null;

  // bottom bar row: the flex row containing MENU + PDF
  const menuBtn = [...document.querySelectorAll('button, a')].find(b => (b.textContent||'').trim()==='MENU');

  return {
    viewport: { w: window.innerWidth, h: window.innerHeight },
    container: { rect: R(container), cls: cls(container), containerType: container ? getComputedStyle(container).containerType : null },
    title: { rect: R(titleEl), cls: cls(titleEl), cs: CS(titleEl, ['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','color']) },
    badge: { rect: R(badge), cls: cls(badge), cs: CS(badge, ['fontFamily','fontSize','fontWeight','color','padding','border','backgroundImage','borderRadius']) },
    cardBox0chain: cardBoxes[0],
    cardRects: cardSvgs.map(s => R(s)),
    funkun,
    pills: { rect: R(pills), cls: cls(pills), btns: emojiBtns.map(b => ({ rect: R(b), cls: cls(b), text: txt(b) })) },
    menu: { rect: R(menuBtn), cls: cls(menuBtn) },
    bottomRow: R(menuBtn ? menuBtn.closest('div[class*="justify"]') || menuBtn.parentElement : null),
  };
});

fs.writeFileSync('docs/research/measurements2.json', JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
