import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from "@astrojs/react";
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://mister-mcgee.github.io',
  integrations: [mdx(), sitemap(), react({
    include: "**/*.tsx"
  })]
});