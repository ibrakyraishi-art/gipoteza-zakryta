import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface Frontmatter {
  title: string
  description: string
  date: string
  updatedAt?: string
  tags?: string[]
  status?: 'published' | 'draft' | 'archived' | 'active'
  readingTime?: string
  // For tools
  type?: string
  links?: {
    primary?: string
    github?: string
    docs?: string
    download?: string
  }
}

export interface Post {
  slug: string
  frontmatter: Frontmatter
  content: string
}

const contentDirectory = path.join(process.cwd(), 'content')

export function getContentDirectory(type: 'blog' | 'publications' | 'tools') {
  return path.join(contentDirectory, type)
}

export async function getAllPosts(type: 'blog' | 'publications' | 'tools'): Promise<Post[]> {
  const dir = getContentDirectory(type)
  
  if (!fs.existsSync(dir)) {
    return []
  }

  const files = fs.readdirSync(dir)
  const posts = files
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
    .map(file => {
      const slug = file.replace(/\.mdx?$/, '')
      const fullPath = path.join(dir, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      const stats = readingTime(content)
      
      return {
        slug,
        frontmatter: {
          ...data,
          readingTime: stats.text,
        } as Frontmatter,
        content,
      }
    })
    .filter(post => post.frontmatter.status !== 'draft')
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime()
      const dateB = new Date(b.frontmatter.date).getTime()
      return dateB - dateA
    })

  return posts
}

export async function getPostBySlug(
  type: 'blog' | 'publications' | 'tools',
  slug: string
): Promise<Post | null> {
  try {
    const dir = getContentDirectory(type)
    const fullPath = path.join(dir, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const stats = readingTime(content)

    return {
      slug,
      frontmatter: {
        ...data,
        readingTime: stats.text,
      } as Frontmatter,
      content,
    }
  } catch (error) {
    return null
  }
}

export async function getSimilarPosts(
  type: 'blog' | 'publications' | 'tools',
  currentSlug: string,
  tags?: string[],
  limit = 3
): Promise<Post[]> {
  const allPosts = await getAllPosts(type)
  
  if (!tags || tags.length === 0) {
    return allPosts
      .filter(post => post.slug !== currentSlug)
      .slice(0, limit)
  }

  const postsWithScores = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      const commonTags = post.frontmatter.tags?.filter(tag => 
        tags.includes(tag)
      ) || []
      return {
        post,
        score: commonTags.length,
      }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)

  return postsWithScores.slice(0, limit).map(item => item.post)
}

export async function getAllTags(type: 'blog' | 'publications' | 'tools'): Promise<string[]> {
  const posts = await getAllPosts(type)
  const tagsSet = new Set<string>()
  
  posts.forEach(post => {
    post.frontmatter.tags?.forEach(tag => tagsSet.add(tag))
  })

  return Array.from(tagsSet).sort()
}

export function getTableOfContents(content: string) {
  const headingRegex = /^#{2,3}\s+(.+)$/gm
  const headings: { level: number; text: string; id: string }[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[0].split('#').length - 1
    const text = match[1].trim()
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')

    headings.push({ level, text, id })
  }

  return headings
}
