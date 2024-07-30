"use client"

import dynamic from "next/dynamic";

export default function Content({ 
  slug, mdx, md 
}: { 
  slug: Array<string>
  mdx : boolean
  md  : boolean
}) {
  if(mdx) {
    const Content = dynamic(() => import(`/idea/${slug.join('/')}.mdx`), { ssr: true  })
    return <Content/>
  }

  if(md) {
    const Content = dynamic(() => import(`/idea/${slug.join('/')}.md` ), { ssr: false })
    return <Content/>
  }

  return null
}