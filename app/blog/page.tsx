import Link from 'next/link'
import { getAllPosts, getAllTags } from '@/lib/content'
import BlogClient from './BlogClient'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  try {
    const posts = await getAllPosts('blog')
    const tags = await getAllTags('blog')
    
    return <BlogClient posts={posts} tags={tags} />
  } catch (error) {
    console.error('Error loading blog:', error)
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">Ошибка загрузки</h1>
        <p className="text-red-400">
          Не удалось загрузить статьи. Ошибка: {error instanceof Error ? error.message : 'Unknown'}
        </p>
      </div>
    )
  }
}
