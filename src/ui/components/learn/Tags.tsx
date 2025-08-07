import Tag from "./Tag";

export default function Tags({ tags }: { tags: Array<string> | undefined }) {
  return <div className="w-full flex gap-1 overflow-x-auto">
    {tags?.map((tag, i) => <Tag key={i} tag={tag}/>)}
  </div>
}