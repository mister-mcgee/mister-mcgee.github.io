import { Warning } from "@phosphor-icons/react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./ui/collapsible";
import { useState } from "react";


interface Props extends React.PropsWithChildren {
  warn : React.ReactNode
}

export function Warn({ warn, children }: Props) {
  const [open, setOpen] = useState(false)

  function onMouseOver (me: React.MouseEvent) {
    setOpen(true )
  }

  function onMouseOut(me: React.MouseEvent) {
    setOpen(false)
  }

  return (
    <div
      onMouseOver={onMouseOver}
      onMouseOut ={onMouseOut }
      className="border border-primary-foreground p-4 rounded bg-secondary"
    >
      <Collapsible open={open}>
          <CollapsibleTrigger>
            <span className="space-x-4">
              <Warning className="inline"/><span>{ warn }</span>
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="CollapsibleContent">
            { children }
          </CollapsibleContent>
      </Collapsible>
    </div>
  )
}