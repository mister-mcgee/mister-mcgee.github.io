export default function Toc({headings}: { headings:Array<{
  text : string;
  slug : string;
  depth: number;
}>}) {
  return <div className="flex flex-col px-4">
    <span className="text-3xl font-bold text-center">Table of Contents</span>
    <ol>
      {headings.map((heading, i) => {
        return <li key={i}><a href={`#${heading.slug}`} className="font-normal text-lg no-underline hover:underline">{heading.text}</a></li>
      })}
    </ol>
  </div>
}