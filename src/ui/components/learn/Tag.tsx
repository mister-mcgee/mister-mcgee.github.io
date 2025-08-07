export default function Tag({ tag }: { tag: string }) {
  function onClick(e: React.MouseEvent) {
    window.location.href = `/learn/tag/${tag.toLowerCase()}`
    e.stopPropagation();
  }

  return <div onClick={onClick} className="h-fit px-2 rounded-full border-1 border-primary text-primary hover:bg-primary hover:text-primary-content text-nowrap flex-nowrap cursor-pointer">
    {`# ${tag.toLowerCase()}`}
  </div>
}