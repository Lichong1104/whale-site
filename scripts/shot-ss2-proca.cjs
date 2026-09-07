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
    const el = page.locator('#proc-a .ss2-fig');
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2500);
    const state = await page.locator('#proc-a video').evaluate(v => ({
      t: v.currentTime.toFixed(2), w: v.videoWidth, h: v.videoHeight, paused: v.paused,
    }));
    console.log(tag, JSON.stringify(state));
    await el.screenshot({ path: `.tmp-proca/proca-${tag}.png` });
    await page.close();
  }
  await browser.close();
  console.log('done');
})();
