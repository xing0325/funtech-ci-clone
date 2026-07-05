import { chromium } from 'playwright';
const base = `http://localhost:${process.env.PORT || 3009}`;
const browser = await chromium.launch({ headless: true });

async function run(choice) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'domcontentloaded' });

  // preloader should be visible early
  await page.waitForTimeout(400);
  const preloadTxt = await page.evaluate(() => document.body.innerText.match(/\d+%/)?.[0] || null);

  // wait for the gate button
  await page.locator(`button:has-text("${choice}")`).first().waitFor({ timeout: 8000 });
  const gateVisible = await page.locator('button:has-text("ON")').first().isVisible();

  // click choice
  await page.locator(`button:has-text("${choice}")`).first().click();
  await page.waitForTimeout(1200);

  const state = await page.evaluate(() => ({
    gateGone: !document.querySelector('.fixed.inset-0.z-\\[9999\\]') && !/PLEASE TURN ON SOUND/i.test(document.body.innerText),
    badgeVisible: /LOGO DETAILS/.test(document.body.innerText),
    audioPaused: document.querySelector('audio')?.paused,
    audioSrc: document.querySelector('audio')?.getAttribute('src'),
  }));
  console.log(`[${choice}] preloader=${preloadTxt} gateShown=${gateVisible} -> gateGone=${state.gateGone} content=${state.badgeVisible} audioPaused=${state.audioPaused}`);
  await ctx.close();
}

await run('ON');
await run('OFF');
await browser.close();
