export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="mb-12 text-center">О проекте</h1>
      
      <div className="space-y-8">
        {/* Hero section with photo */}
        <section className="card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/5 rounded-full blur-3xl"></div>
          
          <div className="grid md:grid-cols-5 gap-8 items-center relative">
            {/* Photo */}
            <div className="md:col-span-2 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent-cyan to-accent-cyan-dark rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                <div className="relative w-64 h-80 rounded-2xl overflow-hidden border-2 border-accent-cyan/40 group-hover:border-accent-cyan transition-all duration-300 shadow-2xl">
                  <img 
                    src="/brand/profile.jpg" 
                    alt="Ибрагим" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.nextElementSibling) {
                        (target.nextElementSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  <div className="hidden absolute inset-0 bg-gradient-to-br from-accent-cyan/20 to-dark-gray items-center justify-center flex-col gap-4">
                    <div className="text-7xl">👨‍💻</div>
                    <p className="text-accent-cyan font-bold text-lg">Ибрагим</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="md:col-span-3">
              <h2 className="text-3xl font-bold mb-4">Привет! 👋</h2>
              <div className="prose prose-lg">
                <p className="text-xl mb-4">
                  Меня зовут <span className="text-accent-cyan font-bold text-2xl">Ибрагим</span>, мне 22 года.
                </p>
                <p className="text-gray-300">
                  Я работаю в мобайле: запускал и web, и app-направления, крутил кампании в SRN 
                  (Google, Facebook, TikTok), Яндексе, DSP и SSP. Разбираюсь в атрибуции трекеров 
                  (AppsFlyer, Adjust, AppMetrica) и знаю, как это влияет на результат.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold mb-4">Мобайл — это гипотезы</h2>
          <div className="prose prose-lg">
            <p>
              Запускаешь, проверяешь, закрываешь. Одни выстреливают, другие нет — 
              но именно из этого рождается опыт.
            </p>
            <p>
              Я создал этот канал, чтобы делиться практикой, кейсами и своими наблюдениями. 
              Здесь без лишней воды — только живой опыт из реальной работы.
            </p>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-bold mb-4">Что я пишу</h2>
          <div className="prose prose-lg">
            <ul className="space-y-2">
              <li>🎯 Атрибуция и трекинг в iOS после iOS 14.5</li>
              <li>📊 User Acquisition и оптимизация кампаний</li>
              <li>🔧 Работа с мобильными трекерами (AppsFlyer, Adjust, AppMetrica)</li>
              <li>💡 Web-воронки и подписочные модели</li>
              <li>🚀 Практические кейсы из реальной работы</li>
              <li>🤖 AI-агенты и автоматизация в маркетинге</li>
            </ul>
          </div>
        </section>

        <section className="card bg-gradient-to-br from-dark-gray to-deep-black border-accent-cyan/30">
          <h2 className="text-2xl font-bold mb-4">Контакты</h2>
          <div className="prose prose-lg">
            <p>
              Если есть вопросы или предложения, пишите в Telegram-канал или напрямую в личку.
            </p>
            <div className="mt-6">
              <a
                href="https://t.me/closedhypothesis"
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
    </div>
  )
}
