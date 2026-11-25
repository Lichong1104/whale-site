import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const failed = [];
page.on('response', (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });

await page.goto('http://localhost:4321/solutions/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await page.screenshot({ path: '.tmp-sol-verify-1.png', fullPage: false });

const slides = await page.$$eval('.reel-slide', (els) => els.length);
for (let i = 0; i < slides; i++) {
  await page.evaluate((idx) => {
    document.querySelector(`[data-tick="${idx}"]`)?.click();
  }, i);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `.tmp-sol-verify-slide-${i + 1}.png`, fullPage: false });
}

const imgs = await page.$$eval('.reel-stage img', (els) => els.map((e) => ({ src: e.currentSrc, w: e.naturalWidth, h: e.naturalHeight })));

await page.goto('http://localhost:4321/solutions/restaurants-cafes/', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
await page.screenshot({ path: '.tmp-sol-verify-detail.png', fullPage: false });

console.log(JSON.stringify({ slides, imgs, failed }, null, 2));
await browser.close();
