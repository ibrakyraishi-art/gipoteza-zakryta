import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, history = [] } = await request.json();

    // Проверяем наличие API ключа
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      return NextResponse.json({ 
        success: false, 
        error: 'GROQ_API_KEY не настроен. Добавьте его в Environment Variables на Vercel.' 
      }, { status: 500 });
    }

    // Проверяем сообщение
    if (!message || message.trim().length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Сообщение не может быть пустым' 
      }, { status: 400 });
    }

    // Формируем системный промпт
    const systemPrompt = `Ты — эксперт по мобильному маркетингу и аналитике. Ты консультируешь по:
- Настройке трекеров (AppsFlyer, Adjust, Kochava, Yandex AppMetrica)
- Атрибуции и аналитике мобильных приложений
- Оптимизации рекламных кампаний
- iOS и Android платформам
- ASO (App Store Optimization)
- Deep linking и deferred deep linking
- SKAN (SKAdNetwork) и iOS 14+ изменениям

Отвечай на русском языке, структурированно и по делу. Приводи конкретные примеры и рекомендации.`;

    // Формируем сообщения для API
    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    // Отправляем запрос к Groq
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768', // Mixtral 8x7B - проверенная рабочая модель
        messages: messages,
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 0.95,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Groq API error:', errorData);
      return NextResponse.json({ 
        success: false, 
        error: `Ошибка Groq API: ${response.status}` 
      }, { status: response.status });
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content || 'Не удалось получить ответ';

    return NextResponse.json({ 
      success: true, 
      message: aiMessage,
      usage: {
        prompt_tokens: data.usage?.prompt_tokens || 0,
        completion_tokens: data.usage?.completion_tokens || 0,
        total_tokens: data.usage?.total_tokens || 0
      }
    });

  } catch (error) {
    console.error('AI Chat error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Неизвестная ошибка' 
    }, { status: 500 });
  }
}
