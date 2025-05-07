import { keep, lookup, nameOf, htmlOf} from "./definitions";
import { useEffect } from "react";

export interface Props extends React.PropsWithChildren {
  term : string;
  html?: string;
}

export default function Define({ 
  term, 
  html, 
  children 
}: Props) {
  const definition = lookup(term);
  
  useEffect(() => {
    keep(term);
  }, [term]);

  return (
    <div className="tooltip border-b border-dotted cursor-help">
      <div className="tooltip-content flex flex-col text-justify">
        <span className="text-lg font-semibold">{nameOf(definition) ?? term}</span>
        <div dangerouslySetInnerHTML={{__html : html ?? htmlOf(definition)}}/>
      </div>
      { children || term }
    </div>
  );
}