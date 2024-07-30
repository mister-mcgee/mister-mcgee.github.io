"use client"

import dynamic from "next/dynamic";

export default function Content({ slug }: { slug: Array<string> }) {

  const Content = dynamic(() => import(`/a/${slug.join('/')}.mdx`))
  return <Content/>
}