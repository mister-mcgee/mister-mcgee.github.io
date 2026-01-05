import clsx from "clsx";
import { BookMarked, Construction } from "lucide-react";
import Tags from "./Tags";


export default function Card({ 
  title,
  course,
  author,
  tags,
  date,
  draft,
  slug
}: { 
  title  ?: string;
  course ?: string;
  author ?: string;
  tags   ?: Array<string>;
  date   ?: Date;
  draft  ?: boolean;
  slug   ?: string;
}) {
  return <div onClick={() => window.open(`/learn/${slug}`)} className="grow-on-hover grow flex flex-col border border-base-300 rounded-lg shadow-lg overflow-hidden cursor-pointer w-sm">
    <div className={clsx("flex text-lg font-semibold py-2 px-4",
      draft && "caution",
      !draft && "bg-primary text-primary-content"
    )}>
      <div className="flex flex-row items-center gap-2">
        {  draft && <Construction className="shrink-0"/> }
        { !draft && <BookMarked   className="shrink-0"/> }
      </div>

      <div className="divider divider-horizontal"></div>    

      <span>
        {course || author || title}
      </span>
    </div>
    <span className="text-lg font-semibold py-2 px-4">{title}</span>
    <div className="p-4 flex flex-col grow justify-end">
      <Tags tags={tags}/>
    </div>
  </div>
}