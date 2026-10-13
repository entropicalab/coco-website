// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lifeatcoco.com',
  trailingSlash: 'never',
  integrations: [
    sitemap({ filter: (page) => !/\/(thank-you|404)\/?$/.test(page) }),
  ],
});
