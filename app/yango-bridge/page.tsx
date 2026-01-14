'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function YangoBridgePage() {
  const searchParams = useSearchParams()
  const [appsflyerLink, setAppsflyerLink] = useState('')

  useEffect(() => {
    // Получаем все UTM параметры из URL
    const utmSource = searchParams.get('utm_source') || ''
    const utmMedium = searchParams.get('utm_medium') || ''
    const utmCampaign = searchParams.get('utm_campaign') || ''
    const utmTerm = searchParams.get('utm_term') || ''
    const utmContent = searchParams.get('utm_content') || ''
    const gclid = searchParams.get('gclid') || ''

    // Базовая ссылка AppsFlyer OneLink (ЗАМЕНИ на свою реальную ссылку)
    const oneLinkBase = 'https://yango.onelink.me/XXXXX'

    // Преобразуем UTM → AppsFlyer параметры
    const params = new URLSearchParams()

    // Основные параметры AppsFlyer
    if (utmSource) params.append('pid', utmSource) // Media source (обычно google_ads)
    if (utmCampaign) params.append('c', utmCampaign) // Campaign name
    if (utmTerm) params.append('af_keywords', utmTerm) // Keywords
    if (utmContent) params.append('af_adset', utmContent) // AdGroup
    if (gclid) params.append('af_ad', gclid) // Google Click ID
    if (utmMedium) params.append('af_channel', utmMedium) // Channel (cpc, display, etc)

    // Дополнительные параметры для детальной атрибуции
    params.append('deep_link_value', 'home') // Куда открыть в приложении
    params.append('af_force_deeplink', 'true') // Форсировать deeplink

    // Собираем итоговую ссылку
    const finalLink = `${oneLinkBase}?${params.toString()}`
    setAppsflyerLink(finalLink)

    // Логируем для отладки (можно удалить в продакшене)
    console.log('Original UTM params:', {
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      gclid,
    })
    console.log('Generated AppsFlyer link:', finalLink)
  }, [searchParams])

  const handleOpenApp = () => {
    // Открываем приложение с параметрами
    window.location.href = appsflyerLink
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob top-0 -left-20"></div>
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 top-0 right-0"></div>
        <div className="absolute w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-0 left-1/2"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-glow">
            Yango Play
          </div>
        </div>

        {/* Tagline */}
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-6 animate-slide-up max-w-4xl">
          Watch. Listen. Play.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
            All in One
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-300 text-center mb-12 max-w-2xl animate-slide-up animation-delay-200">
          Огромная библиотека контента ждёт тебя — полные сезоны, эксклюзивные фильмы, аниме, музыка и многое другое
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl w-full animate-slide-up animation-delay-400">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
            <div className="text-4xl mb-4">🎬</div>
            <h3 className="text-xl font-bold mb-2">Фильмы и сериалы</h3>
            <p className="text-gray-300 text-sm">Тысячи фильмов и сериалов в HD качестве</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50">
            <div className="text-4xl mb-4">🎵</div>
            <h3 className="text-xl font-bold mb-2">Музыка</h3>
            <p className="text-gray-300 text-sm">Миллионы треков и плейлистов для тебя</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-xl font-bold mb-2">Игры</h3>
            <p className="text-gray-300 text-sm">Играй в любимые игры прямо в приложении</p>
          </div>
        </div>

        {/* Main CTA Button */}
        <button
          onClick={handleOpenApp}
          className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white text-xl md:text-2xl font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 animate-pulse-slow"
        >
          <span className="relative z-10">🚀 Открыть Yango Play</span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Additional Info */}
        <div className="mt-8 text-center text-gray-400 text-sm max-w-md">
          <p>
            🔒 Безопасный переход в приложение
            <br />
            📊 Отслеживание через AppsFlyer
          </p>
        </div>

        {/* Debug Info (удали в продакшене) */}
        {appsflyerLink && (
          <div className="mt-8 p-4 bg-black/30 rounded-lg text-xs font-mono max-w-4xl w-full overflow-x-auto">
            <p className="text-gray-400 mb-2">🔗 Сгенерированная ссылка:</p>
            <p className="text-green-400 break-all">{appsflyerLink}</p>
          </div>
        )}
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.85;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes glow {
          0%,
          100% {
            text-shadow: 0 0 20px rgba(168, 85, 247, 0.5),
              0 0 40px rgba(168, 85, 247, 0.3);
          }
          50% {
            text-shadow: 0 0 30px rgba(168, 85, 247, 0.8),
              0 0 60px rgba(168, 85, 247, 0.5);
          }
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
