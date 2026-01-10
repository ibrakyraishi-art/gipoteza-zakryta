import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // Получаем пароль администратора из переменных окружения
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

    // Проверяем пароль
    if (password === ADMIN_PASSWORD) {
      // Генерируем простой токен (в продакшене используй JWT)
      const token = Buffer.from(`${Date.now()}-${password}`).toString('base64');
      
      return NextResponse.json({ 
        success: true, 
        token,
        message: 'Вход выполнен успешно' 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Неверный пароль' 
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Ошибка сервера' 
    }, { status: 500 });
  }
}
