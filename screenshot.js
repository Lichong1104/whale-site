const { chromium, devices } = require('playwright');
const path = require('path');

(async () => {
  const outDir = process.argv[2] || __dirname;
  const url = process.argv[3] || 'http://127.0.0.1:8080/';

  const browser = await chromium.launch();

  // Desktop
  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto(url, { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(3000); // let WebGL animate
  await desktopPage.screenshot({ path: path.join(outDir, 'desktop.png'), fullPage: true });
  await desktopContext.close();

  // Mobile
  const mobileContext = await browser.newContext({ ...devices['iPhone 12'] });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(url, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(3000);
  await mobilePage.screenshot({ path: path.join(outDir, 'mobile.png'), fullPage: true });
  await mobileContext.close();

  await browser.close();
  console.log('Screenshots saved to', outDir);
})();
