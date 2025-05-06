import definitions from "@learn/definitions.json";
import { define    } from "@learn/definitions";
import { useEffect } from "react";

type Definition = typeof definitions[number];

export default function Define({ word, definition, children }: React.PropsWithChildren<{ word: string, definition?: string }>) {
  function lookup(word: string) {
    return definitions.find((entry) => typeof entry.word === "string" ? 
      entry.word   ===   word.toLowerCase(): 
      entry.word.includes(word.toLowerCase()
    ))
  }

  function w(e: Definition | undefined) {
    return (Array.isArray(e?.word) ? e.word.join(" / ") : e?.word) ?? word;
  }

  function d(e: Definition | undefined) {
    return e?.definition ?? definition ?? "¯\\_(ツ)_/¯";
  }

  useEffect(() => {
    define(word);
  }, [word]);

  return (
    <div className="tooltip border-b border-dotted cursor-help">
      <div className="tooltip-content flex flex-col text-justify">
        <span className="text-lg font-semibold">{w(lookup(word))}</span>
        <div dangerouslySetInnerHTML={{ __html: d(lookup(word)) }}/>
      </div>
      { children ?? word }
    </div>
  );
}