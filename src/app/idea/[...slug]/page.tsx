import fs from "fs"

import Content from "./content"

export default function Page({ params }: { params: { slug: Array<string> } }) {
  const mdx = fs.existsSync(`./idea/${params.slug.join("/")}.mdx`)
  const md  = fs.existsSync(`./idea/${params.slug.join("/")}.md` ) ?
    fs.readFileSync(`./idea/${params.slug.join("/")}.md`, "utf-8") : null

  return (    
    <div className="w-full flex flex-col items-center">
      <article className="flex flex-col prose dark:prose-invert prose-noquote">
        <Content slug={params.slug} mdx={mdx} md={md} />
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  return fs.readdirSync("./idea")
    .map   (path => String(path))
    .filter(path => path.match  (/\.mdx?$/    ))
    .map   (path => path.replace(/\.mdx?$/, ""))
    .map   (path => ({ slug: path.split("/") }));
}