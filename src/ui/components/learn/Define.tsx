import { highlight as h, lookup, nameOf, htmlOf} from "./definitions";
import { useEffect } from "react";

export interface Props extends React.PropsWithChildren {  
  term        : string ;
  html       ?: string ;
  highlight  ?: boolean;
}

export default function Define({
  term, 
  html,
  highlight,
  children,
}: Props) {
  const definition = lookup(term);

  useEffect(() => {
    if(highlight ?? true)
      h(term);
  }, [term]);

  return (
    <div className="tooltip border-b border-dotted cursor-help">
      <div className="tooltip-content flex flex-col text-left">
        <span className="text-lg font-semibold">{nameOf(definition) ?? term}</span>
        <div dangerouslySetInnerHTML={{__html : html ?? htmlOf(definition)}}/>
      </div>
      { children || term }
    </div>
  )
}