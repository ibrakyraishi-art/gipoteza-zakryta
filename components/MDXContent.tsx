'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

interface Props {
  mdxSource: MDXRemoteSerializeResult
}

export default function MDXContent({ mdxSource }: Props) {
  return (
    <article className="prose prose-lg max-w-none mb-16">
      <MDXRemote {...mdxSource} />
    </article>
  )
}
