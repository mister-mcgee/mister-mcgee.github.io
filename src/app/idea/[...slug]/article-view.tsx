import { Badge } from "@/components/ui/badge";
import fs from "fs";
import path from "node:path"
import matter from "gray-matter";
import { Fragment } from "react";
import Article from "./article";


export async function generateMetadata({ params }: { params: { slug: Array<string> } }) {
  const raw = fs.readFileSync(`./idea/${params.slug.join('/')}.mdx`)

  const frontmatter = matter(raw)
  const title:       string   = frontmatter.data.title ?? params.slug.at(-1)
  const tags : Array<string>  = frontmatter.data.tags  ?? [                ]

  return {
    title
  }
}

export default function ArticleView(
  { slug }: { slug: Array<string> }
) {
  const frontmatter = matter(fs.readFileSync(`./idea/${slug.join(path.sep)}.mdx`))
  const title: string         = frontmatter.data.title ?? slug.at(-1)
  const tags : Array<string>  = frontmatter.data.tags  ?? [         ] 
  
  return <>
    <div className="w-full grow flex flex-col items-center">
      <div className="w-full grow md:max-w-[768px] border-l border-r shadow-xl">
        <div className="max-w-none px-4 prose prose-xs sm:prose-lg lg:prose-xl dark:prose-invert prose-noquote prose-table:max-w-fit prose-headings:m-0 prose-headings:py-4 bg-card">
          <h1 className="text-center">{title}</h1>
          <div className="flex flex-row justify-center gap-1">
            {tags.map((tag, i) => {
              return <Fragment key={i}>
                <Badge variant={"outline"} className="text-xs sm:text-lg lg:text-xl">
                  # {tag}
                </Badge>
              </Fragment>
            })}
          </div>
          <div className="h-4"></div>
            <Article slug={slug}/>
          <div className="h-4"></div>
        </div>
      </div>
    </div>
  </>
}

