// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from "@astrojs/sitemap";
import tailwindcss from '@tailwindcss/vite';
import expressiveCode from 'astro-expressive-code';
import rehypeCallouts from 'rehype-callouts';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

import Bookmark   from "lucide-static/icons/bookmark.svg?raw";
import Hammer     from "lucide-static/icons/hammer.svg?raw";
import Lightbulb  from "lucide-static/icons/lightbulb.svg?raw";
import Microscope from "lucide-static/icons/microscope.svg?raw";
import Palette    from "lucide-static/icons/palette.svg?raw";
import Scale      from "lucide-static/icons/scale.svg?raw";


/** @type {import('rehype-callouts').UserOptions}*/
const configureRehypeCallouts = {
  callouts: {
    remember  : { title: "Remember"  , indicator: Bookmark   },
    understand: { title: "Understand", indicator: Lightbulb  },
    apply     : { title: "Apply"     , indicator: Hammer     },
    analyze   : { title: "Analyze"   , indicator: Microscope },
    evaluate  : { title: "Evaluate"  , indicator: Scale      },
    create    : { title: "Create"    , indicator: Palette    },
  }
}

// https://astro.build/config
export default defineConfig({
  site: "https://shawn-mcgee.github.io",
  base: "/",
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [expressiveCode({
    themes: ["github-dark", "github-light"],
    useDarkModeMediaQuery: false,
    themeCssSelector: (theme) => {
      switch (theme.name) {
        case "github-dark" : return "[data-theme=dark]";
        case "github-light": return "[data-theme=light]";
        default: return false;
      }
    },
    plugins: [ pluginLineNumbers() ],
    defaultProps: {
      showLineNumbers: false
    }
  }), react(), mdx(), sitemap()],
  markdown: {
    remarkPlugins: [
      remarkMath
    ],
    rehypePlugins: [
      rehypeKatex,
      [rehypeCallouts, configureRehypeCallouts]
    ]
  }
});