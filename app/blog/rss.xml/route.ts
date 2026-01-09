import { getAllPosts } from '@/lib/content'

export async function GET() {
  const posts = await getAllPosts('blog')
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Гипотеза закрыта</title>
    <link>https://gipoteza-zakryta.com</link>
    <description>Практика, кейсы и наблюдения из мира мобильного маркетинга</description>
    <language>ru</language>
    <atom:link href="https://gipoteza-zakryta.com/blog/rss.xml" rel="self" type="application/rss+xml" />
    ${posts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>https://gipoteza-zakryta.com/blog/${post.slug}</link>
      <description>${escapeXml(post.frontmatter.description)}</description>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <guid>https://gipoteza-zakryta.com/blog/${post.slug}</guid>
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
