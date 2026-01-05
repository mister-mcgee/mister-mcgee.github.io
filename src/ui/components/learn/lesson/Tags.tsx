import Tag from "./Tag";

export default function Tags({ tags }: { tags: Array<string> | undefined }) {
  return <div className="w-fit flex gap-1 flex-wrap">
    {tags?.map((tag, i) => <Tag key={i} tag={tag}/>)}
  </div>
}