import { chromium } from 'playwright';
const base = `http://localhost:${process.env.PORT || 3009}`;
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto(base + '/?skipIntro', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);

const keyOf = () => page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--color-key').trim());
console.log('default (fun):', await keyOf());

// click the volt (⚡) pill = first theme button
await page.locator('button[aria-label="volt theme"]').click();
await page.waitForTimeout(600);
console.log('after volt click:', await keyOf(), 'data-theme=', await page.evaluate(() => document.documentElement.getAttribute('data-theme')));
await page.screenshot({ path: 'docs/clone-shots/theme-volt.png' });

// breaker
await page.locator('button[aria-label="breaker theme"]').click();
await page.waitForTimeout(600);
console.log('after breaker click:', await keyOf());

// zoom star card for pen-doodle check
await page.locator('button[aria-label="fun theme"]').click();
await page.waitForTimeout(400);
await browser.close();
