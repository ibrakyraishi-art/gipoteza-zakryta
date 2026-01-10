/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: false,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
