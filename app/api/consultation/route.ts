import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, telegram, message } = body;

    // Валидация: имя обязательно
    if (!name || name.trim().length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Имя обязательно для заполнения' 
      }, { status: 400 });
    }

    // Валидация: хотя бы один способ связи
    if (!phone && !email && !telegram) {
      return NextResponse.json({ 
        success: false, 
        error: 'Укажите хотя бы один способ связи (телефон, email или Telegram)' 
      }, { status: 400 });
    }

    // Сохраняем в БД
    await sql`
      INSERT INTO consultations (name, phone, email, telegram, message)
      VALUES (${name}, ${phone || null}, ${email || null}, ${telegram || null}, ${message || null})
    `;

    return NextResponse.json({ 
      success: true, 
      message: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.' 
    });
  } catch (error) {
    console.error('Consultation submission error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Ошибка при отправке заявки. Попробуйте позже.' 
    }, { status: 500 });
  }
}
