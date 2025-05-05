import glossary from "@learn/glossary.json";

type GlossaryEntry = typeof glossary[number];

export default function Define({ word, definition, children }: React.PropsWithChildren<{ word: string, definition?: string }>) {
  function lookup(word: string) {
    return glossary.find((entry) => typeof entry.word === "string" ? 
      entry.word   ===   word.toLowerCase(): 
      entry.word.includes(word.toLowerCase()
    ))
  }

  function w(e: GlossaryEntry | undefined) {
    return (Array.isArray(e?.word) ? e.word.join(" / ") : e?.word) ?? word;
  }

  function d(e: GlossaryEntry | undefined) {
    return e?.definition ?? definition ?? "¯\\_(ツ)_/¯";
  }

  return (
    <div className="tooltip inline border-b border-dotted cursor-help">
      <div className="tooltip-content flex flex-col text-justify">
        <span className="text-lg font-semibold">{w(lookup(word))}</span>
        <div dangerouslySetInnerHTML={{ __html: d(lookup(word)) }}/>
      </div>
      { children ?? word }
    </div>
  );
}