const { chromium, devices } = require('playwright');
const path = require('path');

(async () => {
  const outDir = process.argv[2] || __dirname;
  const url = process.argv[3] || 'http://localhost:4333/spacesight/';

  const browser = await chromium.launch();

  const shoot = async (context, tag) => {
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(4000);

    // trigger all IntersectionObserver entrances by scrolling through the page
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.7;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 350));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 600));
    });

    await page.screenshot({ path: path.join(outDir, `spx-${tag}-full.png`), fullPage: true });

    for (const [name, selector] of [
      ['hero', '.spx-hero'],
      ['stream', '.spx-stream'],
      ['detect', '#detect'],
      ['find', '#find'],
      ['report', '#report'],
      ['finale', '.spx-finale']
    ]) {
      const el = page.locator(selector);
      if (await el.count()) {
        await el.scrollIntoViewIfNeeded();
        await page.waitForTimeout(900);
        await el.screenshot({ path: path.join(outDir, `spx-${tag}-${name}.png`) });
      }
    }
    await context.close();
  };

  await shoot(await browser.newContext({ viewport: { width: 1440, height: 900 } }), 'desktop');
  await shoot(await browser.newContext({ ...devices['iPhone 12'] }), 'mobile');

  await browser.close();
  console.log('done');
})();
