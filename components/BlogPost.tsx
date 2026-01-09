'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Post } from '@/lib/content'

interface Props {
  slug: string
}

export default function BlogPost({ slug }: Props) {
  const [post, setPost] = useState<Post | null>(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setPost(data.post)
          setContent(data.content)
        }
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-gray-400">Загрузка...</div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">Статья не найдена</h1>
        <p className="text-gray-400 mb-4">{error || 'Статья не найдена'}</p>
        <Link href="/blog" className="text-accent-cyan hover:underline">
          ← Вернуться к списку статей
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link href="/blog" className="text-accent-cyan hover:underline mb-4 inline-block">
          ← Все статьи
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {post.frontmatter.title}
        </h1>
        {post.frontmatter.description && (
          <p className="text-xl text-gray-400 mb-6">
            {post.frontmatter.description}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <time>
            {new Date(post.frontmatter.date).toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
      </div>

      {/* Content */}
      <article 
        className="prose prose-lg prose-invert max-w-none mb-16"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Tags */}
      {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-3">Теги</h3>
          <div className="flex flex-wrap gap-2">
            {post.frontmatter.tags.map(tag => (
              <Link
                key={tag}
                href={`/blog?tag=${tag}`}
                className="px-3 py-1 text-sm bg-dark-gray hover:bg-gray-800 rounded-full transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
