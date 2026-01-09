'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Post } from '@/lib/content'

interface Props {
  slug: string
}

export default function ToolPage({ slug }: Props) {
  const [tool, setTool] = useState<Post | null>(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/tools/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setTool(data.tool)
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

  if (error || !tool) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">Инструмент не найден</h1>
        <p className="text-gray-400 mb-4">{error || 'Инструмент не найден'}</p>
        <Link href="/tools" className="text-accent-cyan hover:underline">
          ← Вернуться к инструментам
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-accent-cyan transition-colors">
            Главная
          </Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-accent-cyan transition-colors">
            Инструменты
          </Link>
          <span>/</span>
          <span className="text-white">{tool.frontmatter.title}</span>
        </nav>

        {/* Tool Header */}
        <header className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <h1 className="flex-1 text-4xl font-bold">{tool.frontmatter.title}</h1>
            {tool.frontmatter.status === 'archived' && (
              <span className="px-3 py-1 text-sm bg-gray-700 rounded-full">Архив</span>
            )}
          </div>
          
          <p className="text-xl text-gray-300 mb-6">
            {tool.frontmatter.description}
          </p>

          {tool.frontmatter.type && (
            <div className="mb-6">
              <span className="px-3 py-1 text-sm bg-accent-cyan/20 text-accent-cyan rounded-full">
                {tool.frontmatter.type}
              </span>
            </div>
          )}

          {/* Links */}
          {tool.frontmatter.links && (
            <div className="flex flex-wrap gap-4">
              {tool.frontmatter.links.primary && (
                <a
                  href={tool.frontmatter.links.primary}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-accent-cyan text-deep-black font-semibold rounded-lg hover:bg-accent-cyan/80 transition-colors"
                >
                  Открыть инструмент
                </a>
              )}
              {tool.frontmatter.links.github && (
                <a
                  href={tool.frontmatter.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-dark-gray hover:bg-gray-800 rounded-lg transition-colors"
                >
                  GitHub
                </a>
              )}
              {tool.frontmatter.links.docs && (
                <a
                  href={tool.frontmatter.links.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-dark-gray hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Документация
                </a>
              )}
              {tool.frontmatter.links.download && (
                <a
                  href={tool.frontmatter.links.download}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-dark-gray hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Скачать
                </a>
              )}
            </div>
          )}
        </header>

        {/* Tool Content */}
        <article 
          className="prose prose-lg prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Back to Tools */}
        <div className="text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-accent-cyan hover:text-accent-cyan/80 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Вернуться к инструментам
          </Link>
        </div>
      </div>
    </div>
  )
}
