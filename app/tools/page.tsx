'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Post } from '@/lib/content'

export default function ToolsPage() {
  const [tools, setTools] = useState<Post[]>([])
  const [filteredTools, setFilteredTools] = useState<Post[]>([])
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<string>('active')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/posts?type=tools')
        const data = await res.json()
        setTools(data)
        setFilteredTools(data.filter((t: Post) => t.frontmatter.status === 'active'))
      } catch (error) {
        console.error('Error fetching tools:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  useEffect(() => {
    let filtered = tools

    if (selectedStatus) {
      filtered = filtered.filter(tool => tool.frontmatter.status === selectedStatus)
    }

    if (selectedType) {
      filtered = filtered.filter(tool => tool.frontmatter.type === selectedType)
    }

    setFilteredTools(filtered)
  }, [selectedType, selectedStatus, tools])

  const types = Array.from(new Set(tools.map(t => t.frontmatter.type).filter(Boolean)))

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
        <h1 className="mb-4">Инструменты</h1>
        <p className="text-xl text-gray-400">
          Полезные инструменты и ресурсы для мобильного маркетинга
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Status Filter */}
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Статус</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedStatus('')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedStatus === ''
                  ? 'bg-accent-cyan text-deep-black'
                  : 'bg-dark-gray text-gray-300 hover:bg-gray-800'
              }`}
            >
              Все
            </button>
            <button
              onClick={() => setSelectedStatus('active')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedStatus === 'active'
                  ? 'bg-accent-cyan text-deep-black'
                  : 'bg-dark-gray text-gray-300 hover:bg-gray-800'
              }`}
            >
              Активные
            </button>
            <button
              onClick={() => setSelectedStatus('archived')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedStatus === 'archived'
                  ? 'bg-accent-cyan text-deep-black'
                  : 'bg-dark-gray text-gray-300 hover:bg-gray-800'
              }`}
            >
              Архивные
            </button>
          </div>
        </div>

        {/* Type Filter */}
        {types.length > 0 && (
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Тип</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedType('')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedType === ''
                    ? 'bg-accent-cyan text-deep-black'
                    : 'bg-dark-gray text-gray-300 hover:bg-gray-800'
                }`}
              >
                Все
              </button>
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type as string)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedType === type
                      ? 'bg-accent-cyan text-deep-black'
                      : 'bg-dark-gray text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`}>
              <article className="card h-full">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white flex-1">
                    {tool.frontmatter.title}
                  </h3>
                  {tool.frontmatter.status === 'archived' && (
                    <span className="badge badge-secondary text-xs">Архив</span>
                  )}
                </div>
                <p className="text-gray-400 mb-4">
                  {tool.frontmatter.description}
                </p>
                {tool.frontmatter.type && (
                  <div className="mb-3">
                    <span className="badge badge-primary">{tool.frontmatter.type}</span>
                  </div>
                )}
                {tool.frontmatter.links?.primary && (
                  <div className="text-accent-cyan text-sm hover:text-accent-cyan-dark transition-colors">
                    Перейти →
                  </div>
                )}
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            Инструменты не найдены. Попробуйте изменить фильтры.
          </p>
        </div>
      )}
    </div>
  )
}
