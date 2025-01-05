import createMDX from '@next/mdx'

import remarkGfm            from 'remark-gfm'
import remarkGemoji         from 'remark-gemoji'
import remarkBreaks         from 'remark-breaks'
import remarkFrontmatter    from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

import rehypeParse          from 'rehype-parse'
import rehypeSlug           from 'rehype-slug'
import rehypeTOC            from '@jsdevtools/rehype-toc'
import rehypeCallouts       from 'rehype-callouts'
import rehypeExpressiveCode from 'rehype-expressive-code'
import rehypeStringify      from 'rehype-stringify'

import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

/** @type {import('rehype-expressive-code').RehypeExpressiveCodeOptions} */
const rehypeExpressiveCodeOptions = {
  themes: ['github-dark', 'github-light'],
  plugins: [ pluginLineNumbers() ],
  defaultProps: { showLineNumbers: false },
  useDarkModeMediaQuery: false,  
  themeCssSelector: (theme) => `.${theme.type}`,
}
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true
  }
}
 
const withMDX = createMDX({
  extension: /\.mdx?$/,
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkGemoji,
      remarkBreaks,
      remarkFrontmatter,
      remarkMdxFrontmatter,
    ],
    rehypePlugins: [
      // rehypeParse,
      rehypeSlug,
      rehypeTOC,
      rehypeCallouts,
      [ 
        rehypeExpressiveCode,
        rehypeExpressiveCodeOptions 
      ],
      // rehypeStringify
    ],
  }
})
 
// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig)