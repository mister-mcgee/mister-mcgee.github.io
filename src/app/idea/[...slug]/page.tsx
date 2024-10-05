import fs from "fs"

import SiteHeader from "@/components/site/site-header"
import FileView from "./view-file"
import FoldView from "./view-fold"

function isFile(path: string) {
  return fs.existsSync(`${path}`) && fs.lstatSync(`${path}`).isFile()
}

function isFold(path: string) {
  return fs.existsSync(`${path}`) && fs.lstatSync(`${path}`).isDirectory()
}

export default function Page({ params }: { params: { slug: Array<string> } }) {
  return <>
    <div className="w-full min-h-dvh flex flex-col">
      <SiteHeader/>
      { isFile(`./idea/${params.slug.join("/")}.mdx`) && <FileView slug={params.slug}/> }
      { isFold(`./idea/${params.slug.join("/")}`    ) && <FoldView slug={params.slug}/> }
    </div>
  </>
}

export async function generateStaticParams() {
  return fs.readdirSync("./idea", { recursive: true })
  .map(path => String(path))
  .map(path => path.replace(/\..*$/, ""))
  .map(path => ({ slug: String(path).split(/\/|\\/) }))
}