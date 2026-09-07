const { chromium, devices } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  for (const [tag, ctxOpts] of [
    ['desktop', { viewport: { width: 1440, height: 900 } }],
    ['mobile', { ...devices['iPhone 12'] }],
  ]) {
    const page = await (await browser.newContext(ctxOpts)).newPage();
    await page.goto('http://localhost:4321/spacesight/', { waitUntil: 'load' });
    await page.addStyleTag({ content: 'astro-dev-toolbar{display:none!important}' });
    await page.waitForTimeout(1500);
    const el = page.locator('.ss2-logowall');
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await el.screenshot({ path: `.tmp-logozip/logowall-${tag}.png` });
    await page.close();
  }
  await browser.close();
  console.log('done');
})();
