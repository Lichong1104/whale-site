import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const failed = [];
page.on('response', (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
const el = await page.$('.accordion-item.active');
if (el) await el.scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
await page.screenshot({ path: '.tmp-sol-verify-home.png' });
console.log(JSON.stringify({ failed }, null, 2));
await browser.close();
