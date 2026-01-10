'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setError(null)

    // Добавляем сообщение пользователя
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newUserMessage])
    setLoading(true)

    try {
      // Отправляем запрос к API
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      })

      const data = await response.json()

      if (data.success) {
        // Добавляем ответ AI
        const aiMessage: Message = {
          role: 'assistant',
          content: data.message,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiMessage])
      } else {
        setError(data.error || 'Ошибка при получении ответа')
      }
    } catch (err) {
      setError('Ошибка сети. Проверьте подключение.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([])
    setError(null)
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Хлебные крошки */}
        <div className="mb-8">
          <Link href="/" className="text-accent-cyan hover:underline">
            ← Назад на главную
          </Link>
        </div>

        {/* Заголовок */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-accent-cyan/10 rounded-full mb-4">
            <svg className="w-12 h-12 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            AI-Консультант
          </h1>
          <p className="text-gray-400 text-lg">
            Задайте вопрос по мобильному маркетингу
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Работает на <span className="text-accent-cyan">Mixtral 8x7B</span> через Groq 🚀
          </p>
        </div>

        {/* Чат-контейнер */}
        <div className="card mb-6">
          {/* Сообщения */}
          <div className="h-[500px] overflow-y-auto mb-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <p className="text-gray-400 mb-4">
                    Начните диалог! Например:
                  </p>
                  <div className="space-y-2">
                    {[
                      'Как настроить атрибуцию в AppsFlyer?',
                      'Что такое SKAdNetwork и как с ним работать?',
                      'Какой трекер выбрать для iOS приложения?',
                      'Как оптимизировать бюджет Facebook Ads?'
                    ].map((example, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(example)}
                        className="block w-full text-left px-4 py-2 rounded-lg bg-dark-gray hover:bg-accent-cyan/10 
                                 border border-gray-700 hover:border-accent-cyan/50 transition-all text-sm"
                      >
                        💡 {example}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === 'user'
                          ? 'bg-accent-cyan text-black'
                          : 'bg-dark-gray border border-gray-700'
                      }`}
                    >
                      <div className="flex items-start gap-2 mb-1">
                        {msg.role === 'assistant' && (
                          <span className="text-accent-cyan">🤖</span>
                        )}
                        {msg.role === 'user' && (
                          <span>👤</span>
                        )}
                        <p className="text-xs opacity-70">
                          {msg.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-dark-gray border border-gray-700">
                      <div className="flex items-center gap-2">
                        <span className="text-accent-cyan">🤖</span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-accent-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-accent-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-accent-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Ошибка */}
          {error && (
            <div className="mb-4 p-3 rounded-lg border bg-red-900/20 border-red-500/50 text-red-400 text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Поле ввода */}
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Введите ваш вопрос..."
              disabled={loading}
              rows={2}
              className="flex-1 bg-dark-gray border border-gray-700 rounded-lg px-4 py-3 
                       focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 
                       transition-all duration-300 resize-none disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center min-w-[80px]"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>

          {/* Очистить чат */}
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="mt-4 text-sm text-gray-500 hover:text-accent-cyan transition-colors"
            >
              🗑️ Очистить историю
            </button>
          )}
        </div>

        {/* Информация */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card text-center">
            <div className="text-accent-cyan text-2xl mb-2">⚡</div>
            <p className="text-sm text-gray-400">Супер-быстрые ответы</p>
            <p className="text-xs text-gray-500 mt-1">2-3 секунды</p>
          </div>
          <div className="card text-center">
            <div className="text-accent-cyan text-2xl mb-2">🧠</div>
            <p className="text-sm text-gray-400">Mixtral 8x7B</p>
            <p className="text-xs text-gray-500 mt-1">От Mistral AI</p>
          </div>
          <div className="card text-center">
            <div className="text-accent-cyan text-2xl mb-2">💰</div>
            <p className="text-sm text-gray-400">Бесплатно</p>
            <p className="text-xs text-gray-500 mt-1">14,400 запросов/день</p>
          </div>
        </div>
      </div>
    </div>
  )
}
