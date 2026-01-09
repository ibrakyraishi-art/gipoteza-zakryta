import { getAllPosts } from '@/lib/content'

export async function GET() {
  const [blogPosts, publications, tools] = await Promise.all([
    getAllPosts('blog'),
    getAllPosts('publications'),
    getAllPosts('tools'),
  ])

  const baseUrl = 'https://gipoteza-zakryta.com'

  const staticPages = [
    '',
    '/blog',
    '/publications',
    '/tools',
    '/about',
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('')}
  ${blogPosts
    .map(
      (post) => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.frontmatter.updatedAt || post.frontmatter.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join('')}
  ${publications
    .map(
      (post) => `
  <url>
    <loc>${baseUrl}/publications/${post.slug}</loc>
    <lastmod>${new Date(post.frontmatter.updatedAt || post.frontmatter.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join('')}
  ${tools
    .map(
      (tool) => `
  <url>
    <loc>${baseUrl}/tools/${tool.slug}</loc>
    <lastmod>${new Date(tool.frontmatter.updatedAt || tool.frontmatter.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
