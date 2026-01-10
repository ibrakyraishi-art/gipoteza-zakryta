'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Consultation {
  id: number
  name: string
  phone: string | null
  email: string | null
  telegram: string | null
  message: string | null
  created_at: string
}

export default function AdminConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Проверяем авторизацию
    const token = localStorage.getItem('admin_token')
    if (!token) {
      // Перенаправляем на страницу логина
      router.push('/admin/login')
      return
    }
    
    setIsAuthenticated(true)
    fetchConsultations()
  }, [])

  const fetchConsultations = async () => {
    try {
      const response = await fetch('/api/consultations')
      const data = await response.json()
      
      if (data.success) {
        setConsultations(data.consultations)
      } else {
        setError(data.error || 'Ошибка загрузки данных')
      }
    } catch (err) {
      setError('Ошибка сети')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  // Показываем загрузку пока проверяем авторизацию
  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-cyan mx-auto mb-4"></div>
          <p className="text-gray-400">Загрузка заявок...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Хлебные крошки */}
        <div className="mb-8">
          <Link href="/" className="text-accent-cyan hover:underline">
            ← Назад на главную
          </Link>
        </div>

        {/* Заголовок */}
        <div className="mb-12 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Админ-панель: Заявки на консультацию
            </h1>
            <p className="text-gray-400">
              Всего заявок: <span className="text-accent-cyan font-bold">{consultations.length}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="btn-primary px-6 py-2 text-sm whitespace-nowrap"
          >
            🔒 Выйти
          </button>
        </div>

        {/* Ошибка */}
        {error && (
          <div className="card bg-red-900/20 border-red-500/50 text-red-400 mb-8">
            <p>⚠️ {error}</p>
            <p className="text-sm mt-2 text-gray-400">
              Таблица БД может не существовать. 
              <a href="/api/init-db" target="_blank" className="text-accent-cyan hover:underline ml-2">
                Инициализировать БД →
              </a>
            </p>
          </div>
        )}

        {/* Список заявок */}
        {consultations.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-400 text-lg mb-4">Пока нет заявок</p>
            <Link href="/consultation" className="btn-primary inline-block">
              Создать тестовую заявку
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {consultations.map((consultation) => (
              <div key={consultation.id} className="card hover:shadow-glow transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Основная информация */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-accent-cyan mb-2">
                      {consultation.name}
                    </h3>
                    
                    {/* Контакты */}
                    <div className="space-y-1 text-gray-300 mb-3">
                      {consultation.phone && (
                        <p>📱 <a href={`tel:${consultation.phone}`} className="hover:text-accent-cyan">{consultation.phone}</a></p>
                      )}
                      {consultation.email && (
                        <p>📧 <a href={`mailto:${consultation.email}`} className="hover:text-accent-cyan">{consultation.email}</a></p>
                      )}
                      {consultation.telegram && (
                        <p>✈️ <a href={`https://t.me/${consultation.telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent-cyan">{consultation.telegram}</a></p>
                      )}
                    </div>

                    {/* Сообщение */}
                    {consultation.message && (
                      <div className="bg-dark-gray rounded-lg p-3 mt-3">
                        <p className="text-sm text-gray-400 mb-1">Сообщение:</p>
                        <p className="text-gray-300">{consultation.message}</p>
                      </div>
                    )}
                  </div>

                  {/* Дата и ID */}
                  <div className="text-right text-sm text-gray-500 space-y-1">
                    <p>ID: #{consultation.id}</p>
                    <p>{formatDate(consultation.created_at)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
