import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { getPostBySlug, getSimilarPosts, getTableOfContents, getAllPosts } from '@/lib/content'
import { serializeMDX } from '@/lib/mdx'
import MDXContent from '@/components/MDXContent'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts('blog')
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug('blog', params.slug)
  
  if (!post) {
    return {
      title: 'Статья не найдена',
    }
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.updatedAt,
      tags: post.frontmatter.tags,
    },
  }
}

export default async function BlogPost({ params }: Props) {
  try {
    const post = await getPostBySlug('blog', params.slug)

    if (!post) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Статья не найдена</h1>
          <p className="text-gray-400 mb-4">
            Файл статьи {params.slug}.mdx не найден в папке content/blog/
          </p>
          <Link href="/blog" className="text-accent-cyan hover:underline">
            ← Вернуться к списку статей
          </Link>
        </div>
      )
    }

    const mdxSource = await serializeMDX(post.content)
    const toc = getTableOfContents(post.content)
    const similarPosts = await getSimilarPosts('blog', params.slug, post.frontmatter.tags, 3)

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-accent-cyan transition-colors">
            Главная
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-accent-cyan transition-colors">
            Блог
          </Link>
          <span>/</span>
          <span className="text-white">{post.frontmatter.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          <h1 className="mb-6">{post.frontmatter.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
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

          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <span key={tag} className="badge badge-primary">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <MDXContent mdxSource={mdxSource} />

        {/* Divider */}
        <div className="border-t border-gray-800 my-12"></div>

        {/* Similar Posts */}
        {similarPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Похожие статьи</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarPosts.map((similarPost) => (
                <Link key={similarPost.slug} href={`/blog/${similarPost.slug}`}>
                  <article className="card h-full">
                    <h3 className="text-lg font-bold mb-2 text-white">
                      {similarPost.frontmatter.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                      {similarPost.frontmatter.description}
                    </p>
                    <time className="text-xs text-gray-500">
                      {new Date(similarPost.frontmatter.date).toLocaleDateString('ru-RU')}
                    </time>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Blog */}
        <div className="text-center">
          <Link
            href="/blog"
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
            Вернуться к списку статей
          </Link>
        </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error rendering blog post:', error)
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4 text-red-400">Ошибка загрузки статьи</h1>
        <p className="text-gray-400 mb-2">
          Произошла ошибка при загрузке статьи {params.slug}
        </p>
        <pre className="bg-dark-gray p-4 rounded-lg text-sm overflow-auto mb-4">
          {error instanceof Error ? error.message : String(error)}
        </pre>
        <Link href="/blog" className="text-accent-cyan hover:underline">
          ← Вернуться к списку статей
        </Link>
      </div>
    )
  }
}
