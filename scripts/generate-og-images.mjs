import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const OG_DIR = path.join(ROOT, 'public', 'og');

if (!fs.existsSync(OG_DIR)) {
  fs.mkdirSync(OG_DIR, { recursive: true });
}

function toBase64(filePath) {
  const data = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mime =
    ext === '.svg' ? 'image/svg+xml' :
    ext === '.png' ? 'image/png' :
    ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
    'application/octet-stream';
  return `data:${mime};base64,${data.toString('base64')}`;
}

const configs = [
  {
    name: 'home',
    logo: 'public/whale-logo.png',
    title: 'Whale AI',
    subtitle: 'Physical Operations Intelligence Platform',
  },
  {
    name: 'spacesight',
    logo: 'public/product-logos/spacesight-logo.png',
    title: 'Whale SpaceSight',
    subtitle: 'AI Audit Platform for Retail & Facilities',
  },
  {
    name: 'alivia',
    logo: 'public/product-logos/alivia-logo.png',
    title: 'Whale Alivia',
    subtitle: 'Enterprise AI OS for Agent Orchestration',
  },
];

function buildHtml({ logo, title, subtitle }) {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body {
        width: 1200px;
        height: 630px;
        overflow: hidden;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      }
      body {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding: 88px;
        color: #fff;
        background: linear-gradient(135deg, #030712 0%, #0b1220 40%, #0f172a 100%);
      }
      .glow {
        position: absolute;
        border-radius: 50%;
        filter: blur(120px);
        opacity: 0.5;
        pointer-events: none;
      }
      .glow-1 {
        width: 520px;
        height: 520px;
        background: radial-gradient(circle, #2563eb 0%, transparent 70%);
        top: -120px;
        right: -80px;
      }
      .glow-2 {
        width: 420px;
        height: 420px;
        background: radial-gradient(circle, #7c3aed 0%, transparent 70%);
        bottom: -100px;
        left: -60px;
      }
      .glow-3 {
        width: 320px;
        height: 320px;
        background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
        top: 40%;
        right: 18%;
        opacity: 0.28;
      }
      .grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
        background-size: 60px 60px;
        mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
        pointer-events: none;
      }
      .logo {
        height: 86px;
        width: auto;
        object-fit: contain;
        margin-bottom: 48px;
        filter: drop-shadow(0 8px 32px rgba(0,0,0,0.35));
      }
      h1 {
        font-size: 76px;
        font-weight: 800;
        line-height: 1.08;
        letter-spacing: -0.03em;
        margin-bottom: 22px;
        background: linear-gradient(90deg, #ffffff 0%, #bae6fd 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      p {
        font-size: 36px;
        font-weight: 500;
        line-height: 1.35;
        color: #93c5fd;
        max-width: 880px;
      }
      .brand-stripe {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 6px;
        background: linear-gradient(90deg, #2563eb 0%, #7c3aed 50%, #06b6d4 100%);
      }
    </style>
  </head>
  <body>
    <div class="glow glow-1"></div>
    <div class="glow glow-2"></div>
    <div class="glow glow-3"></div>
    <div class="grid"></div>
    <img class="logo" src="${logo}" alt="" />
    <h1>${title}</h1>
    <p>${subtitle}</p>
    <div class="brand-stripe"></div>
  </body>
</html>`;
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const config of configs) {
    const logoPath = path.join(ROOT, config.logo);
    const logoDataUrl = toBase64(logoPath);
    const html = buildHtml({
      logo: logoDataUrl,
      title: config.title,
      subtitle: config.subtitle,
    });

    await page.setViewportSize({ width: 1200, height: 630 });
    await page.setContent(html, { waitUntil: 'networkidle' });

    const outPath = path.join(OG_DIR, `${config.name}.png`);
    await page.screenshot({
      path: outPath,
      type: 'png',
      clip: { x: 0, y: 0, width: 1200, height: 630 },
    });

    const stats = fs.statSync(outPath);
    console.log(`Created ${config.name}.png — ${stats.size} bytes`);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
