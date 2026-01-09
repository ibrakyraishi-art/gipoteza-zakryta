import Link from 'next/link'
import { getAllPosts } from '@/lib/content'

export default async function Home() {
  const recentPosts = (await getAllPosts('blog')).slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-cyan/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-cyan/20 rounded-2xl mb-8 border border-accent-cyan/30 animate-pulse-glow">
              <span className="text-accent-cyan font-bold text-4xl">Г</span>
            </div>
            <h1 className="mb-6">
              <span className="block text-gradient">Гипотеза закрыта</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Практика, кейсы и наблюдения из мира мобильного маркетинга.<br />
              <span className="text-accent-cyan">Без воды — только живой опыт из реальной работы.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog" className="btn-primary">
                Читать блог
              </Link>
              <Link href="/tools" className="btn-secondary">
                Инструменты
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-dark-gray/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">О проекте</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Привет! Меня зовут <span className="text-accent-cyan font-semibold">Ибрагим</span>, мне 22 года.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Я работаю в мобайле: запускал и web, и app-направления, крутил кампании в SRN 
              (Google, Facebook, TikTok), Яндексе, DSP и SSP. Разбираюсь в атрибуции трекеров 
              (AppsFlyer, Adjust, AppMetrica) и знаю, как это влияет на результат.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2>Последние статьи</h2>
            <Link href="/blog" className="text-accent-cyan hover:text-accent-cyan-dark transition-colors font-medium">
              Все статьи →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="card h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <time className="text-sm text-gray-500">
                      {new Date(post.frontmatter.date).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    {post.frontmatter.readingTime && (
                      <>
                        <span className="text-gray-600">•</span>
                        <span className="text-sm text-gray-500">{post.frontmatter.readingTime}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {post.frontmatter.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {post.frontmatter.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.frontmatter.tags?.slice(0, 3).map((tag) => (
                      <span key={tag} className="badge badge-secondary">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card text-center max-w-3xl mx-auto bg-gradient-to-br from-dark-gray to-deep-black border-accent-cyan/30">
            <h2 className="mb-4">Присоединяйтесь к сообществу</h2>
            <p className="text-gray-300 mb-8">
              Подписывайтесь на Telegram-канал, чтобы получать новые материалы и обсуждать 
              актуальные темы мобильного маркетинга
            </p>
            <a
              href="https://t.me/gipoteza_zakryta"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.015-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.099.155.232.171.326.016.094.037.308.021.475z"/>
              </svg>
              Telegram канал
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
