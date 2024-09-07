import fs from "fs"

import Content from "./content"

export default function Page({ params }: { params: { slug: Array<string> } }) {

  return (    
    <div className="w-full flex flex-col items-center">
      <article className="flex flex-col prose dark:prose-invert prose-noquote">
        <Content slug={params.slug} />
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  return fs.readdirSync("./idea", { recursive: true })
    .map   (path => String(path))
    .filter(path => path.match  (/\.mdx?$/    ))
    .map   (path => path.replace(/\.mdx?$/, ""))
    .map   (path => ({ slug: path.split("/") }));
}