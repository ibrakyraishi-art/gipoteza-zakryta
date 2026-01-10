import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-gray border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* About */}
          <div className="md:col-span-2 text-center md:text-left">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gradient-accent">
              Гипотеза закрыта
            </h3>
            <p className="text-gray-400 mb-4 text-sm md:text-base">
              Практика, кейсы и наблюдения из мира мобильного маркетинга. 
              Без воды — только живой опыт из реальной работы.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a
                href="https://t.me/closedhypothesis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent-cyan transition-all duration-300 hover:scale-110"
                aria-label="Telegram"
              >
                <svg className="w-7 h-7 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.015-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.099.155.232.171.326.016.094.037.308.021.475z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center md:text-left">
            <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-accent-cyan transition-colors">
                  Блог
                </Link>
              </li>
              <li>
                <Link href="/publications" className="text-gray-400 hover:text-accent-cyan transition-colors">
                  Публикации
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-gray-400 hover:text-accent-cyan transition-colors">
                  Инструменты
                </Link>
              </li>
              <li>
                <Link href="/interactive" className="text-gray-400 hover:text-accent-cyan transition-colors">
                  🎮 Игра
                </Link>
              </li>
              <li>
                <Link href="/ai-chat" className="text-gray-400 hover:text-accent-cyan transition-colors">
                  🤖 AI-Чат
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-accent-cyan transition-colors">
                  О проекте
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="text-gray-400 hover:text-accent-cyan transition-colors">
                  💬 Консультация
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="text-center md:text-left">
            <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Ресурсы</h4>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link href="/blog/rss.xml" className="text-gray-400 hover:text-accent-cyan transition-colors">
                  RSS Feed
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-gray-400 hover:text-accent-cyan transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
            © {currentYear} Гипотеза закрыта. Все права защищены.
          </p>
          <p className="text-gray-500 text-xs md:text-sm text-center md:text-right">
            Сделано с ❤️ для mobile marketing community
          </p>
        </div>
      </div>
    </footer>
  )
}
