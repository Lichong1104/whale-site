import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const bundleDir = path.resolve('whale-site-bundled');

// Copy dist files into whale-site-bundled, preserving structure.
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(distDir, bundleDir);

// Fix absolute paths in index.html to relative paths.
const indexPath = path.join(bundleDir, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Canonical / OG URLs and external links should stay absolute.
// Convert root-relative asset/page references to relative ones.
html = html.replace(/(href|src)="\//g, '$1="');
html = html.replace(/url\(\//g, 'url(');

// Home link should point to the local index.html.
html = html.replace(/href=""/g, 'href="./"');

fs.writeFileSync(indexPath, html, 'utf-8');

console.log('Synced dist to whale-site-bundled and fixed paths.');
