import { chromium } from 'playwright';

const URL = 'https://ci.funtech.inc/en/logo-details';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();

const t0 = Date.now();
await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 }).catch(e => console.log('goto warn:', e.message));
await page.waitForTimeout(1500);

const info = await page.evaluate(() => ({
  title: document.title,
  url: location.href,
  h1: [...document.querySelectorAll('h1')].map(h => h.textContent.trim()),
  bodyTextLen: document.body.innerText.length,
  bodyTextSample: document.body.innerText.slice(0, 600),
  imgCount: document.querySelectorAll('img').length,
  svgCount: document.querySelectorAll('svg').length,
  linkCount: document.querySelectorAll('a').length,
  scrollHeight: document.documentElement.scrollHeight,
  lang: document.documentElement.lang,
  nextData: !!document.querySelector('#__NEXT_DATA__') || !!window.__NEXT_DATA__,
  htmlSnippetHead: document.head.innerHTML.length,
}));

console.log('elapsed ms:', Date.now() - t0);
console.log(JSON.stringify(info, null, 2));

await page.screenshot({ path: 'scripts/_smoke.png', fullPage: false });
console.log('screenshot saved: scripts/_smoke.png');

await browser.close();
