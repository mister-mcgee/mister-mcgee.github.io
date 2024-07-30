import fs from "fs"

import Content from "./content"

export default function Page({ params }: { params: { slug: Array<string> } }) {
  const mdx = fs.existsSync(`./a/${params.slug.join("/")}.mdx`)
  const md  = fs.existsSync(`./a/${params.slug.join("/")}.md` )

  return (    
    <div className="w-dvw flex flex-col items-center">
      <article className="w-[960px] flex flex-col">
        <Content { ...params } mdx={mdx} md={md} />
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  return fs.readdirSync("./a")
    .map   (path => String(path))
    .filter(path => path.match  (/\.mdx?$/    ))
    .map   (path => path.replace(/\.mdx?$/, ""))
    .map   (path => ({ slug: path.split("/") }));
}