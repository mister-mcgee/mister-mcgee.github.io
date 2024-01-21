import { Warning } from "@phosphor-icons/react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./ui/collapsible";

interface Props extends React.PropsWithChildren {
  warn : React.ReactNode
}

export function Warn({ warn, children }: Props) {
  return (
    <div className="border border-primary-foreground p-4 rounded bg-primary">
      <Collapsible>
          <CollapsibleTrigger>
            <span className="space-x-4 hover:underline">
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