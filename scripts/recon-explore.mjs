import { chromium } from 'playwright';
import fs from 'node:fs';

const URL = 'https://ci.funtech.inc/en/logo-details';
const OUT = 'docs/design-references';
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync('docs/research', { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.setDefaultTimeout(45000);

console.log('== goto ==');
await page.goto(URL, { waitUntil: 'load', timeout: 60000 }).catch(e => console.log('goto warn:', e.message));
await page.waitForTimeout(2500);

// 1. Detect tech stack / animation libs
const stack = await page.evaluate(() => {
  const w = window;
  return {
    gsap: !!w.gsap,
    ScrollTrigger: !!(w.ScrollTrigger || (w.gsap && w.gsap.core && w.gsap.plugins && w.gsap.plugins.scrollTrigger)),
    lenis: !!w.Lenis || document.documentElement.classList.contains('lenis') || !!document.querySelector('.lenis'),
    locomotive: !!document.querySelector('[data-scroll-container]') || !!w.LocomotiveScroll,
    barba: !!w.barba,
    three: !!w.THREE,
    nuxt: !!w.__NUXT__,
    next: !!w.__NEXT_DATA__,
    vue: !!w.Vue || !!document.querySelector('[data-v-app]') || !!document.querySelector('#__nuxt'),
    react: !!w.React || !!document.querySelector('#__next') || !!document.querySelector('[data-reactroot]'),
    swiper: !!w.Swiper || !!document.querySelector('.swiper'),
    howler: !!w.Howl || !!w.Howler,
    scripts: [...document.querySelectorAll('script[src]')].map(s => s.src).slice(0, 40),
    generatorMeta: document.querySelector('meta[name="generator"]')?.content || null,
  };
});
console.log('STACK:', JSON.stringify(stack, null, 2));

await page.screenshot({ path: `${OUT}/00-soundgate.png` });

// 2. Dismiss the sound gate — find ON/OFF buttons
const gateInfo = await page.evaluate(() => {
  const btns = [...document.querySelectorAll('button, a, [role=button], div')].filter(el => {
    const t = (el.textContent || '').trim().toUpperCase();
    return (t === 'ON' || t === 'OFF') && el.offsetWidth > 20 && el.offsetWidth < 400;
  });
  return btns.map(b => ({ text: b.textContent.trim(), tag: b.tagName, cls: b.className?.toString().slice(0,80) }));
});
console.log('GATE BUTTONS:', JSON.stringify(gateInfo));

// try clicking OFF (no audio) then fall back to ON
let clicked = null;
for (const label of ['OFF', 'ON']) {
  try {
    const el = page.locator(`text="${label}"`).first();
    if (await el.count()) { await el.click({ timeout: 5000 }); clicked = label; break; }
  } catch (e) { /* try next */ }
}
console.log('clicked gate:', clicked);
await page.waitForTimeout(4000);

await page.screenshot({ path: `${OUT}/01-after-gate.png` });

// 3. Measure structure after dismiss
const post = await page.evaluate(() => {
  const de = document.documentElement;
  const scroller = document.scrollingElement || de;
  return {
    scrollHeight: de.scrollHeight,
    clientHeight: de.clientHeight,
    innerWidth: window.innerWidth,
    bodyOverflow: getComputedStyle(document.body).overflow,
    htmlOverflow: getComputedStyle(de).overflow,
    horizontalScroll: de.scrollWidth > de.clientWidth,
    scrollWidth: de.scrollWidth,
    sectionsById: [...document.querySelectorAll('section, [id]')].slice(0,30).map(s => ({ tag:s.tagName, id:s.id, cls:s.className?.toString().slice(0,50) })),
    gateStillVisible: !!([...document.querySelectorAll('*')].find(el => (el.textContent||'').includes('PLEASE TURN ON SOUND') && el.offsetParent !== null)),
  };
});
console.log('POST-GATE STRUCTURE:', JSON.stringify(post, null, 2));

// 4. Try scrolling down to see if page scrolls & content animates
console.log('== scroll test ==');
for (let i = 0; i < 5; i++) {
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(600);
}
const afterScroll = await page.evaluate(() => ({
  scrollY: window.scrollY,
  scrollHeight: document.documentElement.scrollHeight,
}));
console.log('AFTER SCROLL:', JSON.stringify(afterScroll));
await page.screenshot({ path: `${OUT}/02-scrolled.png`, fullPage: false });

await browser.close();
console.log('done');
