export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://gipoteza-zakryta.com/sitemap.xml`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
