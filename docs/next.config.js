import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  rewrites: () => [
    {
      destination: '/llms.mdx/:path*',
      source: '/docs/:path*.mdx',
    },
  ],
  serverExternalPackages: ['typescript', 'twoslash'],
}

export default withMDX(config)
