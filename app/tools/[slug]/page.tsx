import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { getPostBySlug } from '@/lib/content'
import { serializeMDX, MDXRemote } from '@/lib/mdx'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = await getPostBySlug('tools', params.slug)
  
  if (!tool) {
    return {
      title: 'Инструмент не найден',
    }
  }

  return {
    title: tool.frontmatter.title,
    description: tool.frontmatter.description,
  }
}

export default async function ToolPage({ params }: Props) {
  const tool = await getPostBySlug('tools', params.slug)

  if (!tool) {
    notFound()
  }

  const mdxSource = await serializeMDX(tool.content)

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
            <h1 className="flex-1">{tool.frontmatter.title}</h1>
            {tool.frontmatter.status === 'archived' && (
              <span className="badge badge-secondary">Архив</span>
            )}
          </div>
          
          <p className="text-xl text-gray-300 mb-6">
            {tool.frontmatter.description}
          </p>

          {tool.frontmatter.type && (
            <div className="mb-6">
              <span className="badge badge-primary">{tool.frontmatter.type}</span>
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
                  className="btn-primary"
                >
                  Открыть инструмент
                </a>
              )}
              {tool.frontmatter.links.github && (
                <a
                  href={tool.frontmatter.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  GitHub
                </a>
              )}
              {tool.frontmatter.links.docs && (
                <a
                  href={tool.frontmatter.links.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Документация
                </a>
              )}
              {tool.frontmatter.links.download && (
                <a
                  href={tool.frontmatter.links.download}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Скачать
                </a>
              )}
            </div>
          )}
        </header>

        {/* Tool Content */}
        <article className="prose prose-lg max-w-none mb-12">
          <MDXRemote {...mdxSource} />
        </article>

        {/* Back to Tools */}
        <div className="text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-accent-cyan hover:text-accent-cyan-dark transition-colors"
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
