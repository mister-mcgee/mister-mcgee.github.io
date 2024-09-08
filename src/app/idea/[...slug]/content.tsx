"use client"

import dynamic from "next/dynamic";

export default function Content(
  { slug, className }: { slug: Array<string>, className?: string }
) {
  const Content = dynamic(() => import(`/idea/${slug.join('/')}.mdx`), { ssr: true  })
  return <>
    <article className={className}>
      <Content/>
    </article>
  </>
}