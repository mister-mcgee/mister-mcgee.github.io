import { BookMarked, Construction, Info, Newspaper, Scroll } from "lucide-react";
import { Lesson } from ".";
import Tags from "./Tags";
import clsx from "clsx";


export default function Card({ lesson }: { lesson: Lesson }) {
  return <a href={`/learn/${Lesson.slug(lesson)}`} className="grow-on-hover grow flex flex-col border border-base-300 rounded-lg shadow-lg overflow-hidden cursor-pointer w-md">
    <div className={clsx("flex text-lg font-semibold py-2 px-4",
      lesson.data.draft && "caution",
      !lesson.data.draft && "bg-primary text-primary-content"
    )}>
      <div className="flex flex-row items-center gap-2">
        {  lesson.data.draft && <Construction className="shrink-0"/> }
        { !lesson.data.draft && <BookMarked   className="shrink-0"/> }
      </div>

      <div className="divider divider-horizontal"></div>
     

      <span>
        {lesson.data.course || lesson.data.author || lesson.data.title}
      </span>
    </div>
    <span className="text-lg font-semibold py-2 px-4">{lesson.data.title}</span>
    <div className="p-4 flex flex-col grow justify-end">
      <Tags tags={lesson.data.tags}/>
    </div>
  </a>
}