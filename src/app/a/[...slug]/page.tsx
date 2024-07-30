import fs from "fs"

import Content from "./content"
import { useTheme } from "next-themes"

export default function Page({ params }: { params: { slug: Array<string> } }) {

  let path = ""
  if(fs.existsSync(`./a/${params.slug.join('/')}.mdx`)) path = `./a/${params.slug.join('/')}.mdx`
  if(fs.existsSync(`./a/${params.slug.join('/')}.md` )) path = `./a/${params.slug.join('/')}.md`
  
  

  return (    
    <div className="w-dvw flex flex-col items-center">
      <article className="w-[960px] flex flex-col">
        <Content { ...params } path={ path }/>
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