import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Mister McGee',
  tagline: 'Robotics & Mechatronics',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://mister-mcgee.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'mister-mcgee', // Usually your GitHub org/user name.
  projectName: 'mister-mcgee.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/logo.png',
    navbar: {
      title: 'Mister McGee',
      logo: {
        alt: 'Mister McGe Spectacles',
        src: 'img/logo-transparent.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'resources',
          position: 'left',
          label: 'Resources',
        },
        {
          type: 'docSidebar',
          sidebarId: 'robotics0',
          position: 'left',
          label: 'Pre-Intro',
        },
        {
          type: 'docSidebar',
          sidebarId: 'robotics1',
          position: 'left',
          label: 'Robotics I',
        },
        {
          type: 'docSidebar',
          sidebarId: 'robotics2',
          position: 'left',
          label: 'Robotics II',
        },
        {
          type: 'docSidebar',
          sidebarId: 'robotics3',
          position: 'left',
          label: 'Robotics III',
        },
        {
          type: 'docSidebar',
          sidebarId: 'robotics4',
          position: 'left',
          label: 'Robotics IV',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Links',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/mister-mcgee',
            },
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/in/shawn-maurice-mcgee/',
            },
          ],
        },
        {
          title: 'Made Using',
          items: [
            {
              label: 'Obsidian',
              href: 'https://obsidian.md/',
            },
            {
              label: 'Docusaurus',
              href: 'https://docusaurus.io/',
            },
            {
              label: 'Obsidiosaurus',
              href: 'https://cimsta.github.io/obsidiosaurus-docs/',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Mister McGee.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [require.resolve('docusaurus-lunr-search')],
};

export default config;
