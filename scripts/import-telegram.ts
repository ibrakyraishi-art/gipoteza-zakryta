import * as fs from 'fs'
import * as path from 'path'

interface Article {
  id: string
  date: string
  text: string
  reactions?: number
}

function parseHTML(html: string): Article[] {
  const articles: Article[] = []
  
  // Парсим HTML и извлекаем сообщения
  const messageRegex = /<div class="message default clearfix" id="message(\d+)">[\s\S]*?<div class="text">([\s\S]*?)<\/div>[\s\S]*?<div class="pull_right date details" title="([\s\S]*?)">/g
  
  let match
  while ((match = messageRegex.exec(html)) !== null) {
    const id = match[1]
    let text = match[2]
    const dateStr = match[3]
    
    // Очистка HTML
    text = text
      .replace(/<br>/g, '\n')
      .replace(/<\/?strong>/g, '**')
      .replace(/<\/?em>/g, '*')
      .replace(/<code>/g, '`')
      .replace(/<\/code>/g, '`')
      .replace(/<pre>/g, '\n```\n')
      .replace(/<\/pre>/g, '\n```\n')
      .replace(/&laquo;/g, '«')
      .replace(/&raquo;/g, '»')
      .replace(/&nbsp;/g, ' ')
      .replace(/<a[^>]*>.*?<\/a>/g, '')
      .replace(/<[^>]+>/g, '')
      .trim()
    
    if (text && text.length > 100) {
      articles.push({
        id,
        date: dateStr,
        text
      })
    }
  }
  
  return articles
}

function createMDXFile(article: Article, index: number, outputDir: string) {
  const title = article.text.split('\n')[0].replace(/^#+\s*/, '').replace(/^[*_❗️⚫️]+\s*/, '').trim()
  const slug = `post-${article.id}`
  
  // Извлекаем описание (первый параграф без заголовка)
  const lines = article.text.split('\n').filter(l => l.trim())
  let description = lines.find((line, i) => i > 0 && line.length > 50 && !line.startsWith('#')) || ''
  description = description.substring(0, 200).trim()
  
  // Определяем теги на основе содержимого
  const tags: string[] = []
  const lowerText = article.text.toLowerCase()
  
  if (lowerText.includes('att') || lowerText.includes('idfa')) tags.push('iOS')
  if (lowerText.includes('атрибуц')) tags.push('Атрибуция')
  if (lowerText.includes('appsflyer') || lowerText.includes('adjust')) tags.push('MMP')
  if (lowerText.includes('источник') || lowerText.includes('кампани')) tags.push('UA')
  if (lowerText.includes('подписк') || lowerText.includes('web')) tags.push('Монетизация')
  if (lowerText.includes('skan')) tags.push('SKAN')
  if (lowerText.includes('vta') || lowerText.includes('cta')) tags.push('Трекинг')
  if (lowerText.includes('минусован') || lowerText.includes('аудитори')) tags.push('Аудитории')
  if (lowerText.includes('инкремент') || lowerText.includes('каннибал')) tags.push('Аналитика')
  if (lowerText.includes('ai') || lowerText.includes('агент')) tags.push('AI')
  
  if (tags.length === 0) tags.push('Mobile Marketing')
  
  // Парсим дату
  const dateMatch = article.date.match(/(\d{2})\.(\d{2})\.(\d{4})/)
  const isoDate = dateMatch ? `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}` : new Date().toISOString().split('T')[0]
  
  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
date: "${isoDate}"
tags: [${tags.map(t => `"${t}"`).join(', ')}]
status: "published"
---

`
  
  const content = frontmatter + article.text
  
  const filePath = path.join(outputDir, `${slug}.mdx`)
  fs.writeFileSync(filePath, content, 'utf-8')
  
  console.log(`Created: ${slug}.mdx`)
}

// Основная функция
function main() {
  const htmlPath = process.argv[2]
  
  if (!htmlPath) {
    console.error('Usage: ts-node import-telegram.ts <path-to-html-file>')
    process.exit(1)
  }
  
  if (!fs.existsSync(htmlPath)) {
    console.error(`File not found: ${htmlPath}`)
    process.exit(1)
  }
  
  const html = fs.readFileSync(htmlPath, 'utf-8')
  const articles = parseHTML(html)
  
  console.log(`Found ${articles.length} articles`)
  
  const outputDir = path.join(process.cwd(), 'content', 'blog')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  articles.forEach((article, index) => {
    createMDXFile(article, index, outputDir)
  })
  
  console.log(`\nImported ${articles.length} articles to ${outputDir}`)
}

main()
