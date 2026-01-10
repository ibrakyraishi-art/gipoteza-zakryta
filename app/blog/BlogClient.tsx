'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Post } from '@/lib/content'

interface Props {
  posts: Post[]
  tags: string[]
}

export default function BlogClient({ posts, tags }: Props) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts)
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    let filtered = posts

    if (selectedTag) {
      filtered = filtered.filter(post => 
        post.frontmatter.tags?.includes(selectedTag)
      )
    }

    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.frontmatter.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredPosts(filtered)
  }, [selectedTag, searchQuery, posts])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8 md:mb-12 text-center md:text-left">
        <h1 className="mb-4 text-3xl md:text-5xl">Блог</h1>
        <p className="text-lg md:text-xl text-gray-400">
          Статьи о мобильном маркетинге, атрибуции и оптимизации кампаний
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск статей..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-gray border border-gray-800 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan transition-colors"
          />
          <svg
            className="absolute left-4 top-3.5 w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag('')}
            className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
              selectedTag === ''
                ? 'bg-accent-cyan text-deep-black shadow-lg shadow-accent-cyan/30'
                : 'bg-dark-gray text-gray-300 hover:bg-gray-800'
            }`}
          >
            Все
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                selectedTag === tag
                  ? 'bg-accent-cyan text-deep-black shadow-lg shadow-accent-cyan/30'
                  : 'bg-dark-gray text-gray-300 hover:bg-gray-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-gray-400 mb-6">
        Найдено статей: <span className="text-white font-semibold">{filteredPosts.length}</span>
      </p>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredPosts.map((post, index) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article 
                className="card h-full hover-glow-pulse group relative overflow-hidden"
                style={{
                  animation: `slide-in-up 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/0 to-accent-cyan/0 group-hover:from-accent-cyan/5 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3 text-xs md:text-sm">
                    <time className="text-gray-500">
                      {new Date(post.frontmatter.date).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    {post.frontmatter.readingTime && (
                      <>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-500">{post.frontmatter.readingTime}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-white group-hover:text-accent-cyan transition-colors">
                    {post.frontmatter.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-3 text-sm md:text-base">
                    {post.frontmatter.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.frontmatter.tags?.slice(0, 3).map((tag) => (
                      <span key={tag} className="badge badge-secondary text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-400 text-lg">
            По вашему запросу ничего не найдено. Попробуйте изменить фильтры.
          </p>
        </div>
      )}
    </div>
  )
}
