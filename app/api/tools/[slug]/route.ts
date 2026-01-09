import { NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/content'
import { marked } from 'marked'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const tool = await getPostBySlug('tools', params.slug)
    
    if (!tool) {
      return NextResponse.json(
        { error: 'Tool not found' },
        { status: 404 }
      )
    }

    // Convert markdown to HTML
    const html = marked(tool.content)

    return NextResponse.json({
      tool: {
        frontmatter: tool.frontmatter,
        slug: tool.slug,
      },
      content: html,
    })
  } catch (error) {
    console.error('Error fetching tool:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
