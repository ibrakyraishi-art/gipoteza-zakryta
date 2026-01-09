import { NextRequest, NextResponse } from 'next/server'
import { getAllTags } from '@/lib/content'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type') as 'blog' | 'publications' | 'tools' || 'blog'
  
  try {
    const tags = await getAllTags(type)
    return NextResponse.json(tags)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 })
  }
}
