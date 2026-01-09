import ToolPage from '@/components/ToolPage'
import { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.slug} | Гипотеза закрыта`,
    description: 'Инструмент из каталога Гипотеза закрыта',
  }
}

export default function ToolDetailPage({ params }: Props) {
  return <ToolPage slug={params.slug} />
}
