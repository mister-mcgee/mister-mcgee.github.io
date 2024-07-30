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
    const Content = dynamic(() => import(`/a/${slug.join('/')}.mdx`), { ssr: true  })
    return <Content/>
  }

  if(md) {
    const Content = dynamic(() => import(`/a/${slug.join('/')}.md` ), { ssr: false })
    return <Content/>
  }

  return <></>
}