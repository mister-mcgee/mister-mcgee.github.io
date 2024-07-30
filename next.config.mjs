import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeExpressiveCode from 'rehype-expressive-code'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

/** @type {import('rehype-expressive-code').RehypeExpressiveCodeOptions} */
const rehypeExpressiveCodeOptions = {
  themes: ["github-dark", "github-light"],
  plugins: [pluginLineNumbers()],
  defaultProps: {
    showLineNumbers: false,
  },
  useDarkModeMediaQuery: false,
  themeCssSelector: (theme) => `.${theme.type}`,
}
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true
}
 
const withMDX = createMDX({
  extension: /\.mdx?$/,
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [ remarkGfm ],
    rehypePlugins: [[ rehypeExpressiveCode, rehypeExpressiveCodeOptions ]],
  }
})
 
// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig)