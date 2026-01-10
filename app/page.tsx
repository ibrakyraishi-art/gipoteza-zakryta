import Link from 'next/link'

export default function Home() {
  const recentPosts: any[] = []

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 via-transparent to-accent-cyan/5 animate-gradient"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,217,255,0.1),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo with float animation */}
            <div className="inline-flex items-center justify-center w-24 h-24 mb-8 animate-float">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_25px_rgba(0,217,255,0.5)]">
                <circle cx="100" cy="100" r="95" stroke="#00d9ff" strokeWidth="10" fill="none"/>
                <path d="M50 100 L85 135 L150 70" stroke="#ffffff" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            
            <h1 className="mb-6 animate-slide-in">
              <span className="block text-gradient bg-gradient-to-r from-white via-accent-cyan to-white bg-clip-text text-transparent">
                Гипотеза закрыта
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed animate-slide-in" style={{animationDelay: '0.1s'}}>
              Практика, кейсы и наблюдения из мира мобильного маркетинга.<br />
              <span className="text-accent-cyan font-semibold">Без воды — только живой опыт из реальной работы.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in" style={{animationDelay: '0.2s'}}>
              <Link href="/blog" className="btn-primary group relative overflow-hidden">
                <span className="relative z-10">Читать блог</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan-dark to-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <Link href="/tools" className="btn-secondary group">
                <span>Инструменты</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-dark-gray/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,217,255,0.05),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Photo */}
              <div className="order-2 md:order-1 flex justify-center">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent-cyan to-accent-cyan-dark rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden border-2 border-accent-cyan/30 group-hover:border-accent-cyan/60 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/20 to-dark-gray flex items-center justify-center">
                      <div className="text-6xl">👨‍💻</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="order-1 md:order-2 text-center md:text-left">
                <h2 className="mb-6">О проекте</h2>
                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                  Привет! Меня зовут <span className="text-accent-cyan font-bold text-2xl">Ибрагим</span>, мне 22 года.
                </p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Я работаю в мобайле: запускал и web, и app-направления, крутил кампании в SRN 
                  (Google, Facebook, TikTok), Яндексе, DSP и SSP. Разбираюсь в атрибуции трекеров 
                  (AppsFlyer, Adjust, AppMetrica) и знаю, как это влияет на результат.
                </p>
                <Link href="/about" className="btn-secondary inline-flex items-center gap-2">
                  Узнать больше
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
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
          <div className="text-center py-12">
            <p className="text-gray-400">
              7 статей из мира мобильного маркетинга уже ждут вас в блоге!
            </p>
            <Link href="/blog" className="btn-primary mt-6 inline-block">
              Перейти в блог
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Game Teaser */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/5 via-transparent to-accent-cyan/5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="card text-center max-w-4xl mx-auto bg-gradient-to-br from-accent-cyan/10 via-dark-gray to-deep-black border-accent-cyan/50 hover-glow-pulse">
            <div className="text-6xl mb-6 animate-float">🎮</div>
            <h2 className="mb-4 text-3xl md:text-4xl">Попробуй поймать гипотезу!</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Интерактивная игра: проверь свою реакцию и набери максимум очков!
            </p>
            <Link href="/interactive" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
              <span>Начать игру</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card text-center max-w-3xl mx-auto bg-gradient-to-br from-dark-gray to-deep-black border-accent-cyan/30 hover-glow-pulse">
            <div className="text-5xl mb-6">📱</div>
            <h2 className="mb-4">Присоединяйтесь к сообществу</h2>
            <p className="text-gray-300 mb-8 text-base md:text-lg">
              Подписывайтесь на Telegram-канал, чтобы получать новые материалы и обсуждать 
              актуальные темы мобильного маркетинга
            </p>
            <a
              href="https://t.me/closedhypothesis"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
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
