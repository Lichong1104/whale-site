import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = '.tmp-solution-zip/Solution';
const OUT = 'public/images/solutions';

const MAP = [
  ['Fashion_Footwear.png', 'fashion-footwear-offprice.webp'],
  ['Beauty.png', 'beauty-personal-care.webp'],
  ['Pharmacy.png', 'grocery-pharmacy.webp'],
  ['Kitchen.png', 'restaurants-cafes.webp'],
  ['Telecom.png', 'telecom-consumer-electronics.webp'],
  ['Convenience.png', 'variety-discount-convenience.webp'],
];

mkdirSync(OUT, { recursive: true });

for (const [src, out] of MAP) {
  const dest = join(OUT, out);
  const info = await sharp(join(SRC, src))
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(dest);
  console.log(`${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
