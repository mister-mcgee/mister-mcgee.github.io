import { Info as Icon } from "@phosphor-icons/react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./ui/collapsible";

interface Props extends React.PropsWithChildren {
  info : React.ReactNode
}

export function Info({ info, children }: Props) {
  return (
    <div className="border border-primary-foreground p-4 rounded bg-secondary">
      <Collapsible>
          <CollapsibleTrigger>
            <span className="space-x-4 hover:underline">
              <Icon className="inline"/><span>{ info }</span>
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="CollapsibleContent">
            { children }
          </CollapsibleContent>
      </Collapsible>
    </div>
  )
}