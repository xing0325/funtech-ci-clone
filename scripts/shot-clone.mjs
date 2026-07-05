import { chromium } from 'playwright';
import fs from 'node:fs';
fs.mkdirSync('docs/clone-shots', { recursive: true });

const PORT = process.env.PORT || 3009;
const base = `http://localhost:${PORT}`;
const browser = await chromium.launch({ headless: true });

async function shot(path, url, { w = 1440, h = 900, wait = 1500 } = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  page.on('pageerror', e => console.log('PAGE EXCEPTION:', e.message.slice(0, 160)));
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(e => console.log('goto warn', e.message));
  await page.waitForTimeout(wait);
  await page.screenshot({ path });
  console.log('saved', path);
  await ctx.close();
}

// settled content (skip intro)
await shot('docs/clone-shots/desktop.png', `${base}/?skipIntro`, { w: 1440, h: 900 });
await shot('docs/clone-shots/mobile.png', `${base}/?skipIntro`, { w: 390, h: 844 });
await shot('docs/clone-shots/tablet.png', `${base}/?skipIntro`, { w: 768, h: 1024 });

// intro: capture the sound gate (after preloader finishes ~2.2s)
await shot('docs/clone-shots/gate.png', `${base}/`, { w: 1440, h: 900, wait: 2600 });

await browser.close();
