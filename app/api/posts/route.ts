import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/content'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type') as 'blog' | 'publications' | 'tools' || 'blog'
  
  try {
    const posts = await getAllPosts(type)
    return NextResponse.json(posts)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch posts',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
