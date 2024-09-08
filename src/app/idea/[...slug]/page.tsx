import fs from "fs"
import matter from "gray-matter"

import Content from "./content"

import { Badge } from "@/components/ui/badge"
import SiteHeader from "@/components/site/site-header"

export default function Page({ params }: { params: { slug: Array<string> } }) {
  const raw = fs.readFileSync(`./idea/${params.slug.join('/')}.mdx`)

  const frontmatter = matter(raw)
  const title: string         = frontmatter.data.title ?? params.slug.at(-1)
  const tags : Array<string>  = frontmatter.data.tags  ?? [ ]

  return <>
    <SiteHeader/>
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[240px] sm:max-w-[360px] md:max-w-[480px] lg:max-w-[640px] xl:max-w-[720px]">
        
        <div className="h-4"></div>
        
        <div className="w-full flex flex-row justify-center">
          <span className="text-5xl font-bold text-primary">{ title }</span>
        </div>

        <div className="w-full flex flex-row justify-center gap-1">
          {tags.map((tag, i) => {
            return <Badge key={i} variant="outline" className="text-sm">{ tag }</Badge>
          })}
        </div>


        <article className="w-full max-w-none prose prose-xs sm:prose-base md:prose-lg lg:prose-xl dark:prose-invert prose-noquote prose-table:max-w-fit">
          <Content slug={params.slug} />
        </article>
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