import fs   from "fs"
import path from "path"

import SiteHeader from "@/components/site/site-header"

import ArticleView   from "./article-view"
import DirectoryView from "./directory-view"

export default function Page({ params }: { params: { slug: Array<string> } }) {
  return <>
    <div className="w-full min-h-dvh flex flex-col">
      <SiteHeader/>
      { isFile     (params.slug.join(path.sep), "./idea/", ".mdx") && <ArticleView   slug={params.slug}/> }
      { isDirectory(params.slug.join(path.sep), "./idea/"        ) && <DirectoryView slug={params.slug}/> }
    </div>
  </>
}

function isFile     (path: string, prefix="", postfix="") {
  return fs.existsSync(`${prefix}${path}${postfix}`) && fs.lstatSync(`${prefix}${path}${postfix}`).isFile()
}

function isDirectory(path: string, prefix="", postfix="") {
  return fs.existsSync(`${prefix}${path}${postfix}`) && fs.lstatSync(`${prefix}${path}${postfix}`).isDirectory()
}

export async function generateStaticParams() {
  const articles = fs.readdirSync("./idea", { recursive: true })
    .map   (file => String(file))
    .filter(file => isFile(file, "./idea/"))
    .filter(file => file.match  (/\.mdx?$/    ))
    .map   (file => file.replace(/\.mdx?$/, ""))
    .map   (file => ({ slug: file.split(path.sep) }));

  const directories = fs.readdirSync("./idea", { recursive: true })
    .map   (directory => String(directory))
    .filter(directory => isDirectory(directory, "./idea/"))
    .map   (directory => ({ slug: directory.split(path.sep) }));

  return ["", ...directories, ...articles]
}