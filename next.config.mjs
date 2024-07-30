import createMDX from '@next/mdx'
import rehypeExpressiveCode from 'rehype-expressive-code'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

/** @type {import('rehype-expressive-code').RehypeExpressiveCodeOptions} */
const rehypeExpressiveCodeOptions = {
  plugins: [pluginLineNumbers()],
}
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: false,
}
 
const withMDX = createMDX({
  extension: /\.mdx?$/,
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [                                                     ],
    rehypePlugins: [[ rehypeExpressiveCode, rehypeExpressiveCodeOptions ]],
  },
})
 
// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig)