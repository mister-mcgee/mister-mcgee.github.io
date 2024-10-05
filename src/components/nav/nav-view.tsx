import fs from "fs"
import NavFile from "./nav-file"
import NavFold from "./nav-fold"

function isFile(path: string) {
  return fs.existsSync(`${path}`) && fs.lstatSync(`${path}`).isFile()
}

function isFold(path: string) {
  return fs.existsSync(`${path}`) && fs.lstatSync(`${path}`).isDirectory()
}

export interface Tree {
  root: Node
}

export interface File {
  type: "file" 
  path: string
  name: string
  
}

export interface Fold {    
  type: "fold"
  path: string
  name: string

  nodes: Array<Node>
}

export type Node = File | Fold

function Node(path: string): Node {
  if (isFile(path)) return File(path)
  if (isFold(path)) return Fold(path)
  return File(path)
}

function File(path: string): File {
  const name = path.split(/\/|\\/).at(-1)!
  return {
    type: "file",
    path,
    name,
  }
}

function Fold(path: string): Fold {
  const name = path.split(/\/|\\/).at(-1)!
  return {
    type: "fold",
    path,
    name,
    nodes: fs.readdirSync(path)
      .map(node => String(node))
      .map(node => node.replace(/\..*?$/, ""))
      .map(node => Node(`${path}/${node}`))
  }
}


export default function NavView({ root }: { root: string }) {
  const tree: Tree = {
    root: Node(root)
  }
  return <>
    { tree.root.type === "file" && <NavFile file={tree.root}/> }
    { tree.root.type === "fold" && <NavFold fold={tree.root}/> }
  </>  
}