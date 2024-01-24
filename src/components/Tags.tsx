import { Badge } from "@/components/ui/badge"

function Tag({tag}: {tag: React.ReactNode}) {
  return <> {tag && <Badge key={tag?.toString()}>#{tag}</Badge>} </>
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