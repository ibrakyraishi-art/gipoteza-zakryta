'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Post } from '@/lib/content'

export default function PublicationsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/posts?type=publications')
        const data = await res.json()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching publications:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-cyan mx-auto mb-4"></div>
          <p className="text-gray-400">Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="mb-4">Публикации</h1>
        <p className="text-xl text-gray-400">
          Избранные материалы и исследования
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/publications/${post.slug}`}>
              <article className="card">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3 text-white">
                      {post.frontmatter.title}
                    </h2>
                    <p className="text-gray-400 mb-4">
                      {post.frontmatter.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <time>
                        {new Date(post.frontmatter.date).toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      {post.frontmatter.readingTime && (
                        <>
                          <span>•</span>
                          <span>{post.frontmatter.readingTime}</span>
                        </>
                      )}
                    </div>
                  </div>
                  {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.frontmatter.tags.map((tag) => (
                        <span key={tag} className="badge badge-secondary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            Публикации появятся в ближайшее время.
          </p>
        </div>
      )}
    </div>
  )
}
