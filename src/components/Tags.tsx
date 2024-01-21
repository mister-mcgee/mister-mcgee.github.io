import { Badge } from "@/components/ui/badge"

function Tag({tag}: {tag: React.ReactNode}) {
  return (
    // <div className="border border-primary text-primary rounded-full p-2">
    //   #{tag}
    // </div>
    <Badge>#{tag}</Badge>
  )
}

interface Props {
  tags: Array<React.ReactNode>
}

export function Tags({ tags }: Props) {
  return(
    <div className="flex space-x-1 justify-center">
      {tags.map(tag => (
        <Tag tag={tag}/>
      ))}
    </div>
  )
}

export default Tags