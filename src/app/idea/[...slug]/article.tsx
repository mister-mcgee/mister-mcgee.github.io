"use client";

import dynamic from "next/dynamic"

export default function Article({ slug }: { slug: Array<string> }) {
  const Content = dynamic(() => import(`/idea/${slug.join('/')}.mdx`), { ssr: true  })
  return <article>
    <Content/>
  </article>
}