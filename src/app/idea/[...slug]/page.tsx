import fs from "fs"
import matter from "gray-matter"

import Content from "./content"

import { Badge } from "@/components/ui/badge"
import SiteHeader from "@/components/site/site-header"
import { Fragment } from "react"

export default function Page({ params }: { params: { slug: Array<string> } }) {
  const raw = fs.readFileSync(`./idea/${params.slug.join('/')}.mdx`)

  const frontmatter = matter(raw)
  const title: string         = frontmatter.data.title ?? params.slug.at(-1)
  const tags : Array<string>  = frontmatter.data.tags  ?? [                ]

  return <>
    <SiteHeader/>
    <div className="w-full flex flex-col items-center">
      <div className="w-full lg:max-w-[1024px] border-l border-r shadow-xl">
        <div className="max-w-none prose prose-xs sm:prose-lg lg:prose-xl dark:prose-invert prose-noquote prose-table:max-w-fit prose-headings:my-4">
          <h1 className="text-center">{title}</h1>
          <div className="flex flex-row justify-center gap-1 pb-4">
            {tags.map((tag, i) => {
              return <Fragment key={i}>
                <Badge variant={"outline"}>
                  #{tag}
                </Badge>
              </Fragment>
            })}
          </div>
          <Content slug={params.slug} className="px-8"/>
        </div>
      </div>
    </div>
  </>
}

export async function generateStaticParams() {
  return fs.readdirSync("./idea", { recursive: true })
    .map   (path => String(path))
    .filter(path => path.match  (/\.mdx?$/    ))
    .map   (path => path.replace(/\.mdx?$/, ""))
    .map   (path => ({ slug: path.split("/") }));
}