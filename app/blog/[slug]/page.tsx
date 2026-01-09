import BlogPost from '@/components/BlogPost'
import { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.slug} | Гипотеза закрыта`,
    description: 'Статья из блога Гипотеза закрыта',
  }
}

export default function BlogPostPage({ params }: Props) {
  return <BlogPost slug={params.slug} />
}
