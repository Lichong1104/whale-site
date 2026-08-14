import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.whale.sg',
  output: 'static',
  integrations: [sitemap()],
  build: {
    format: 'directory'
  }
});
