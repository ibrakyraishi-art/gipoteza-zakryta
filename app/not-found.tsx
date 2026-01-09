import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-accent-cyan/20 rounded-2xl mb-8 border border-accent-cyan/30">
          <span className="text-accent-cyan font-bold text-5xl">404</span>
        </div>
        <h1 className="mb-4">Страница не найдена</h1>
        <p className="text-xl text-gray-400 mb-8">
          К сожалению, запрашиваемая страница не существует или была перемещена.
        </p>
        <Link href="/" className="btn-primary">
          Вернуться на главную
        </Link>
      </div>
    </div>
  )
}
