'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function InteractivePage() {
  const [score, setScore] = useState(0)
  const [clicks, setClicks] = useState(0)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [isMoving, setIsMoving] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameOver, setGameOver] = useState(false)
  const [highScore, setHighScore] = useState(0)

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('hypothesisGameHighScore')
    if (saved) setHighScore(parseInt(saved))
  }, [])

  // Game timer
  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameStarted) {
      endGame()
    }
  }, [timeLeft, gameStarted, gameOver])

  const moveRandomly = () => {
    const newX = Math.random() * 80 + 10 // 10-90%
    const newY = Math.random() * 70 + 10 // 10-80%
    setPosition({ x: newX, y: newY })
  }

  const handleClick = () => {
    if (!gameStarted) {
      setGameStarted(true)
      setTimeLeft(30)
      setScore(0)
      setClicks(0)
      setGameOver(false)
    }

    setClicks(clicks + 1)
    setScore(score + 10)
    setIsMoving(true)
    moveRandomly()
    
    setTimeout(() => setIsMoving(false), 300)
  }

  const endGame = () => {
    setGameOver(true)
    setGameStarted(false)
    
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('hypothesisGameHighScore', score.toString())
    }
  }

  const resetGame = () => {
    setScore(0)
    setClicks(0)
    setTimeLeft(30)
    setGameOver(false)
    setGameStarted(false)
    setPosition({ x: 50, y: 50 })
  }

  const accuracy = clicks > 0 ? ((score / (clicks * 10)) * 100).toFixed(1) : 0

  return (
    <div className="min-h-screen bg-deep-black">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-accent-cyan hover:text-accent-cyan-dark transition-colors mb-8">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          На главную
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-accent">Поймай гипотезу!</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Интерактивная игра: кликай по силуэту и набирай очки! 🎯
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
          <div className="card text-center">
            <div className="text-3xl font-bold text-accent-cyan">{score}</div>
            <div className="text-sm text-gray-400">Очки</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-white">{timeLeft}s</div>
            <div className="text-sm text-gray-400">Время</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-400">{clicks}</div>
            <div className="text-sm text-gray-400">Кликов</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-purple-400">{highScore}</div>
            <div className="text-sm text-gray-400">Рекорд</div>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative max-w-5xl mx-auto">
          <div 
            className="relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-dark-gray to-deep-black border-2 border-accent-cyan/30 rounded-2xl overflow-hidden"
            style={{
              boxShadow: '0 0 50px rgba(0, 217, 255, 0.2), inset 0 0 50px rgba(0, 217, 255, 0.05)'
            }}
          >
            {/* Background grid effect */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>

            {/* Game Over / Start Screen */}
            {(!gameStarted || gameOver) && (
              <div className="absolute inset-0 flex items-center justify-center bg-deep-black/80 backdrop-blur-sm z-20">
                <div className="text-center p-8">
                  {gameOver ? (
                    <>
                      <h2 className="text-4xl font-bold mb-4 text-accent-cyan">Игра окончена!</h2>
                      <p className="text-2xl mb-2">Ваш счёт: <span className="text-accent-cyan font-bold">{score}</span></p>
                      <p className="text-lg text-gray-400 mb-2">Кликов: {clicks}</p>
                      <p className="text-lg text-gray-400 mb-6">Точность: {accuracy}%</p>
                      {score === highScore && score > 0 && (
                        <p className="text-xl text-yellow-400 mb-6 animate-pulse">🏆 Новый рекорд!</p>
                      )}
                      <button onClick={resetGame} className="btn-primary">
                        Играть снова
                      </button>
                    </>
                  ) : (
                    <>
                      <h2 className="text-3xl font-bold mb-4">Готовы начать?</h2>
                      <p className="text-gray-400 mb-6">
                        Кликайте по движущемуся силуэту<br />
                        У вас есть 30 секунд!
                      </p>
                      <button onClick={handleClick} className="btn-primary text-xl px-8 py-4">
                        Начать игру
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Moving silhouette */}
            {gameStarted && !gameOver && (
              <div
                className={`absolute cursor-pointer transition-all duration-300 hover:scale-110 ${isMoving ? 'scale-95' : 'scale-100'}`}
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: 'translate(-50%, -50%)',
                  filter: 'drop-shadow(0 0 20px rgba(0, 217, 255, 0.6))'
                }}
                onClick={handleClick}
              >
                {/* Silhouette - simplified person icon */}
                <div className="relative w-24 h-32 md:w-32 md:h-40">
                  <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    {/* Head */}
                    <circle cx="50" cy="25" r="20" fill="#00d9ff" className="animate-pulse"/>
                    {/* Body */}
                    <rect x="35" y="45" width="30" height="50" rx="5" fill="#00d9ff" className="animate-pulse"/>
                    {/* Arms */}
                    <rect x="15" y="50" width="20" height="8" rx="4" fill="#00d9ff" className="animate-pulse" transform="rotate(-20 25 54)"/>
                    <rect x="65" y="50" width="20" height="8" rx="4" fill="#00d9ff" className="animate-pulse" transform="rotate(20 75 54)"/>
                    {/* Legs */}
                    <rect x="38" y="95" width="10" height="45" rx="5" fill="#00d9ff" className="animate-pulse"/>
                    <rect x="52" y="95" width="10" height="45" rx="5" fill="#00d9ff" className="animate-pulse"/>
                  </svg>
                  
                  {/* Click effect */}
                  {isMoving && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-2xl font-bold text-white animate-ping">+10</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="max-w-3xl mx-auto mt-12 card">
          <h3 className="text-2xl font-bold mb-4 text-accent-cyan">Как играть?</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-accent-cyan text-xl">🎯</span>
              <span>Нажмите &quot;Начать игру&quot; чтобы запустить таймер</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent-cyan text-xl">👆</span>
              <span>Кликайте по движущемуся силуэту, чтобы набрать очки</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent-cyan text-xl">⚡</span>
              <span>Каждый клик = 10 очков</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent-cyan text-xl">⏱️</span>
              <span>У вас есть 30 секунд, чтобы набрать максимум очков!</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent-cyan text-xl">🏆</span>
              <span>Побейте свой рекорд и поделитесь результатом!</span>
            </li>
          </ul>
        </div>

        {/* Share section */}
        <div className="max-w-3xl mx-auto mt-8 card text-center bg-gradient-to-br from-dark-gray to-deep-black border-accent-cyan/30">
          <h3 className="text-xl font-bold mb-4">Понравилась игра?</h3>
          <p className="text-gray-400 mb-6">
            Подпишитесь на Telegram-канал, чтобы не пропустить новые материалы и обновления!
          </p>
          <a
            href="https://t.me/closedhypothesis"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.015-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.099.155.232.171.326.016.094.037.308.021.475z"/>
            </svg>
            Подписаться на канал
          </a>
        </div>
      </div>
    </div>
  )
}
