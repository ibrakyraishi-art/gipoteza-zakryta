'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    telegram: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      setResult(data)

      if (data.success) {
        // Очищаем форму при успехе
        setFormData({
          name: '',
          phone: '',
          email: '',
          telegram: '',
          message: ''
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Ошибка сети. Проверьте подключение и попробуйте снова.'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Хлебные крошки */}
        <div className="mb-8">
          <Link href="/" className="text-accent-cyan hover:underline">
            ← Назад на главную
          </Link>
        </div>

        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Получить консультацию
          </h1>
          <p className="text-gray-400 text-lg">
            Оставьте свои контакты, и я свяжусь с вами в ближайшее время
          </p>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="card space-y-6">
          {/* Имя и Фамилия */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Имя и Фамилия <span className="text-accent-cyan">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Иван Иванов"
              className="w-full bg-dark-gray border border-gray-700 rounded-lg px-4 py-3 
                       focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 
                       transition-all duration-300"
            />
          </div>

          {/* Способы связи */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-300">
              Способ связи <span className="text-accent-cyan">*</span>
              <span className="text-gray-500 text-xs ml-2">(укажите хотя бы один)</span>
            </p>

            {/* Телефон */}
            <div>
              <label htmlFor="phone" className="block text-sm text-gray-400 mb-2">
                📱 Телефон
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7 (999) 123-45-67"
                className="w-full bg-dark-gray border border-gray-700 rounded-lg px-4 py-3 
                         focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 
                         transition-all duration-300"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                📧 Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className="w-full bg-dark-gray border border-gray-700 rounded-lg px-4 py-3 
                         focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 
                         transition-all duration-300"
              />
            </div>

            {/* Telegram */}
            <div>
              <label htmlFor="telegram" className="block text-sm text-gray-400 mb-2">
                ✈️ Telegram
              </label>
              <input
                type="text"
                id="telegram"
                name="telegram"
                value={formData.telegram}
                onChange={handleChange}
                placeholder="@username"
                className="w-full bg-dark-gray border border-gray-700 rounded-lg px-4 py-3 
                         focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 
                         transition-all duration-300"
              />
            </div>
          </div>

          {/* Сообщение */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
              Сообщение (опционально)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Расскажите, что вас интересует..."
              className="w-full bg-dark-gray border border-gray-700 rounded-lg px-4 py-3 
                       focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 
                       transition-all duration-300 resize-none"
            />
          </div>

          {/* Результат отправки */}
          {result && (
            <div className={`p-4 rounded-lg border ${
              result.success 
                ? 'bg-green-900/20 border-green-500/50 text-green-400' 
                : 'bg-red-900/20 border-red-500/50 text-red-400'
            }`}>
              {result.message}
            </div>
          )}

          {/* Кнопка отправки */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 
                     disabled:cursor-not-allowed relative overflow-hidden group"
          >
            <span className={loading ? 'opacity-0' : ''}>
              Отправить заявку
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

          {/* Примечание */}
          <p className="text-xs text-gray-500 text-center">
            Нажимая кнопку, вы соглашаетесь на обработку персональных данных
          </p>
        </form>
      </div>
    </div>
  )
}
