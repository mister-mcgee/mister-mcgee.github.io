"use client"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { FolderClosed, FolderOpen } from "lucide-react"
import { Fragment, useState } from "react"
import NavFile from "./nav-file"
import { Fold } from "./nav-view"

export default function NavFold({ fold }: { fold: Fold }) {
  const [open, setOpen] = useState(true)
  return <>
    <Collapsible open={open}>
      <CollapsibleTrigger onClick={() => setOpen(!open)}>
        <div className="flex flex-row items-center gap-1 text-xl">
          {  open && <FolderOpen  /> }
          { !open && <FolderClosed/> }
          <a href={`${fold.path.substring(1)}`} className="hover:underline">
            { fold.name }
          </a>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-1 pl-8">
          { fold.nodes.map((node) => {
            return <Fragment key={node.path}>
              { node.type === "file" && <NavFile file={node}/> }
              { node.type === "fold" && <NavFold fold={node}/> }
            </Fragment>
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  </>
}