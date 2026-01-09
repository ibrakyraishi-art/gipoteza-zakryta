import { NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/content'
import { marked } from 'marked'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await getPostBySlug('blog', params.slug)
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Convert markdown to HTML
    const html = marked(post.content)

    return NextResponse.json({
      post: {
        frontmatter: post.frontmatter,
        slug: post.slug,
      },
      content: html,
    })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
