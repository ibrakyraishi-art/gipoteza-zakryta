import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: {
    default: 'Гипотеза закрыта | Mobile Marketing Blog',
    template: '%s | Гипотеза закрыта'
  },
  description: 'Практика, кейсы и наблюдения из мира мобильного маркетинга. Без воды — только живой опыт из реальной работы.',
  keywords: ['mobile marketing', 'app marketing', 'UA', 'iOS', 'Android', 'attribution', 'мобильный маркетинг'],
  authors: [{ name: 'Ибрагим', url: 'https://gipoteza-zakryta.com' }],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://gipoteza-zakryta.com',
    siteName: 'Гипотеза закрыта',
    title: 'Гипотеза закрыта | Mobile Marketing Blog',
    description: 'Практика, кейсы и наблюдения из мира мобильного маркетинга',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Гипотеза закрыта',
    description: 'Практика, кейсы и наблюдения из мира мобильного маркетинга',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
