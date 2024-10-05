import { ScrollText } from "lucide-react"

import { Tree, Node, File, Fold } from "./nav-view"

export default function NavFile({ file }: { file: File }) {
  return <>
    <a href={`${file.path.substring(1)}`} className="flex flex-row items-center gap-1 text-xl hover:underline">
      <ScrollText/>
      { file.name }
    </a>
  </>
}