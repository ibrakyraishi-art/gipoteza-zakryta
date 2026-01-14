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

    // Базовая ссылка AppsFlyer OneLink
    const oneLinkBase = 'https://yango.onelink.me/XXXXX'

    // Преобразуем UTM → AppsFlyer параметры
    const params = new URLSearchParams()

    if (utmSource) params.append('pid', utmSource)
    if (utmCampaign) params.append('c', utmCampaign)
    if (utmTerm) params.append('af_keywords', utmTerm)
    if (utmContent) params.append('af_adset', utmContent)
    if (gclid) params.append('af_ad', gclid)
    if (utmMedium) params.append('af_channel', utmMedium)

    params.append('deep_link_value', 'home')
    params.append('af_force_deeplink', 'true')

    const finalLink = `${oneLinkBase}?${params.toString()}`
    setAppsflyerLink(finalLink)
  }, [searchParams])

  const handleOpenApp = () => {
    window.location.href = appsflyerLink
  }

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white overflow-hidden relative">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl -top-40 -left-40 animate-pulse-slow"></div>
        <div className="absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl top-20 right-0 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute w-[400px] h-[400px] bg-pink-600/20 rounded-full blur-3xl bottom-0 left-1/3 animate-pulse-slow animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            YANGO PLAY
          </h1>
        </div>

        {/* Main Headline */}
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-4xl md:text-6xl font-black leading-tight mb-4">
            FREE 60 DAYS
            <br />
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              OF THE BEST SERIES
            </span>
          </h2>
        </div>

        {/* Phone mockup with glowing border */}
        <div className="relative mb-12 animate-slide-up animation-delay-200">
          {/* Glowing gradient border */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-[3rem] blur-2xl opacity-60 animate-glow-pulse"></div>
          
          {/* Phone container */}
          <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-1 rounded-[3rem]">
            <div className="bg-black rounded-[2.8rem] overflow-hidden w-[280px] h-[580px] md:w-[320px] md:h-[640px]">
              {/* Status bar */}
              <div className="flex items-center justify-between px-6 pt-3 pb-2">
                <div className="text-xs font-semibold">05:07</div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-3 border border-white rounded-sm"></div>
                  <div className="text-xs">📶</div>
                  <div className="text-xs">📡</div>
                  <div className="text-xs">🔋</div>
                </div>
              </div>

              {/* Content area - series poster */}
              <div className="relative w-full h-full bg-gradient-to-b from-gray-900 to-black px-4 pb-20">
                {/* Placeholder for series image */}
                <div className="w-full h-[320px] bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 rounded-2xl mb-4 flex items-center justify-center overflow-hidden relative">
                  {/* Mock series poster */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎭</div>
                      <div className="text-2xl font-bold text-amber-100 arabic-text mb-2">بضع ساعات في يوم ما</div>
                      <div className="text-sm text-amber-200/80">Arabic Drama Series</div>
                    </div>
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Series dots indicator */}
                <div className="flex justify-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                </div>

                {/* Description */}
                <p className="text-xs text-center text-gray-300 leading-relaxed mb-4">
                  In just a few hours love ignites, secrets unravel and lives change forever. Yassin and Sara stumble through awkward, charming moments...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleOpenApp}
          className="group relative px-16 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full text-white text-xl md:text-2xl font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 animate-slide-up animation-delay-400"
        >
          <span className="relative z-10">Download App</span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
        </button>

        {/* Fine print */}
        <p className="mt-6 text-xs text-gray-500 max-w-md text-center animate-fade-in animation-delay-600">
          60 days on Yango Plus subscription from first login. Cancel anytime. Terms apply.
        </p>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
          animation-fill-mode: both;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        .animate-glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }

        .arabic-text {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          direction: rtl;
        }
      `}</style>
    </div>
  )
}
