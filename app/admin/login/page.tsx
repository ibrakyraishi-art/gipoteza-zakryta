'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      const data = await response.json()

      if (data.success) {
        // Сохраняем токен в localStorage
        localStorage.setItem('admin_token', data.token)
        // Перенаправляем в админку
        router.push('/admin/consultations')
      } else {
        setError(data.error || 'Неверный пароль')
      }
    } catch (err) {
      setError('Ошибка соединения')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Хлебные крошки */}
        <div className="mb-8">
          <Link href="/" className="text-accent-cyan hover:underline">
            ← Назад на главную
          </Link>
        </div>

        {/* Форма логина */}
        <div className="card">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-accent-cyan/10 rounded-full mb-4">
              <svg className="w-12 h-12 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-gradient">
              Вход в админ-панель
            </h1>
            <p className="text-gray-400">
              Введите пароль для доступа к заявкам
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Введите пароль администратора"
                className="w-full bg-dark-gray border border-gray-700 rounded-lg px-4 py-3 
                         focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 
                         transition-all duration-300"
                autoFocus
              />
            </div>

            {error && (
              <div className="p-4 rounded-lg border bg-red-900/20 border-red-500/50 text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 
                       disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className={loading ? 'opacity-0' : ''}>
                Войти
              </span>
              {loading && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                      fill="none"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Пароль хранится в переменных окружения Vercel</p>
          </div>
        </div>
      </div>
    </div>
  )
}
