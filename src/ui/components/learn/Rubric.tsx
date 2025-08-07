import clsx from "clsx"
import { SquareCheckBig, Star as StarFull, Trash } from "lucide-react"
import { useId, useState } from "react"

export interface Criteria {
  type: "toggle" | "rating"
  label : string
  points: number
  suggest ?: string
}

function Sticky({ rubric, title, toggles, ratings }: { rubric: Array<Criteria>, title ?: string, toggles: Array<boolean>, ratings: Array<number> }) {
  const numberOfToggles      = rubric.filter(c => c.type === "toggle").length
  const numberOfRatings      = rubric.filter(c => c.type === "rating").length
  const numberOfTogglePoints = rubric.filter(c => c.type === "toggle").reduce((n, t) => n + t.points, 0)
  const numberOfRatingPoints = rubric.filter(c => c.type === "rating").reduce((n, r) => n + r.points, 0)
  const numberOfPoints       = numberOfTogglePoints + numberOfRatingPoints

  const numberOfSelectedToggles           = toggles.filter(t => t    ).length
  const numberOfSelectedRatings           = ratings.filter(r => r > 0).length
  const numberOfPointsFromSelectedToggles = rubric.reduce((n, e, i) => (e.type === "toggle" && toggles[i] ? e.points   : 0) + n, 0)
  const numberOfPointsFromSelectedRatings = rubric.reduce((n, e, i) => (e.type === "rating" && ratings[i] ? ratings[i] : 0) + n, 0)
  const numberOfPointsFromSelected        = numberOfPointsFromSelectedToggles + numberOfPointsFromSelectedRatings
  
  const maximumPointsFromSelectedToggles  = rubric.reduce((n, e, i) => (e.type === "toggle" && toggles[i] ? e.points: 0) + n, 0)
  const maximumPointsFromSelectedRatings  = rubric.reduce((n, e, i) => (e.type === "rating" && ratings[i] ? e.points: 0) + n, 0)
  const maximumPointsFromSelected         = maximumPointsFromSelectedToggles + maximumPointsFromSelectedRatings

  const rightProgress = Math.round((numberOfPointsFromSelected) / (numberOfPoints) * 100);
  const wrongProgress = Math.round(( maximumPointsFromSelected) / (numberOfPoints) * 100);

  const score    = Math.round((numberOfPointsFromSelected  / numberOfPoints) * 100);
  const performance = (
    score ===   0 ? { emoji: "🥱", label: "Not Started"      , style: "border-base-300 text-base-content/65 bg-base-200" } :
    score === 100 ? { emoji: "🤩", label: "Perfect"          , style: "border-primary text-primary bg-primary/10" } :
    score >=   85 ? { emoji: "😄", label: "Mastery"          , style: "border-success text-success-content dark:text-success bg-success/10" } :
    score >=   70 ? { emoji: "👍", label: "Proficient"       , style: "border-warning text-warning-content dark:text-warning bg-warning/10" } :
                    { emoji: "😢", label: "Needs Improvement", style: "border-error   text-error-content   dark:text-error   bg-error/10"   }
  )
  
  return <div className="grow-on-hover sticky top-0 z-10 flex flex-col items-center gap-2 bg-base-100 rounded-md border border-base-200 shadow-sm p-4">
    {!!title && <span className="font-semibold text-xl">{title}</span>}

    <div className="w-full h-4 relative bg-base-200 rounded-full overflow-hidden border-2 border-base-200">
      <div className="absolute bg-base-300 z-20 h-full" style={{ width: `${wrongProgress}%` }}></div>
      <div className="absolute bg-success  z-30 h-full" style={{ width: `${rightProgress}%` }}></div>
    </div>

    <div className="relative w-full flex flex-row justify-between gap-2">
      <span className="flex flex-row gap-2">
        { (numberOfToggles > 0) && <span className="flex items-center gap-2"><SquareCheckBig/> {numberOfSelectedToggles} / {numberOfToggles}</span> }
        { (numberOfRatings > 0) && <span className="flex items-center gap-2"><StarFull      /> {numberOfSelectedRatings} / {numberOfRatings}</span> }
      </span>
      
      <span className={clsx("px-2 border rounded-md absolute left-1/2 transform -translate-x-1/2", performance.style)}>
        {performance.label} {performance.emoji}
      </span>

      <span>{numberOfPointsFromSelected} / {numberOfPoints} ({score}%)</span>
    </div>
  </div>
}


function Toggle({ index, label, points, suggest, toggle, setToggle }: Criteria & { index: number, toggle: boolean, setToggle: (i: number, value: boolean) => void }) {
  function onClick() {
    setToggle(index, !toggle);
  }
  
  return <div className="grow-on-hover p-4 flex flex-col rounded-md border border-base-200 shadow-sm cursor-pointer" onClick={onClick}>
    <div className="text-lg flex gap-2 items-center justify-between">
      <span className="font-medium">{label}</span>
      <input type="checkbox" checked={toggle} className="checkbox checkbox-primary bg-primary/20 border-none" onChange={() => { }}/>
    </div>
    <span className="text-base-content/65 italic w-1/2 text-base">
      { suggest }
    </span>
    <span className="text-right text-sm text-base-content/65">
      {toggle ? points : 0} / {points}
    </span>
  </div>
}

function Rating({ index, label, points, suggest, rating, setRating }: Criteria & { index: number, rating: number , setRating: (i: number, value: number) => void }) {
  const id = useId();
  return (
    <div className="grow-on-hover p-4 flex flex-col rounded-md border border-base-200 shadow-sm">
      <div className="flex flex-row items-center justify-between gap-2">
        <span className="font-medium">{label}</span>
        <div className="rating rating-lg">
          <input type="radio" name={id} className="rating-hidden" aria-label="clear-rating" onClick={() => setRating(index, 0)}/>
          {new Array(points).fill(0).map((_, i) => (
            <input key={i} type="radio" name={id} className="mask mask-star-2 bg-primary" aria-label={`${i + 1} star`} onClick={() => setRating(index, i + 1)} checked={rating === i + 1} onChange={() => { }}/>
          ))}
        </div>
      </div>
      <span className="text-base-content/65 italic w-1/2 text-base">
        { suggest }
      </span>
      <span className="text-right text-sm text-base-content/65">
        {rating} / {points}
      </span>
    </div>
  )
}

export default function Rubric({ rubric, title }: { rubric: Array<Criteria>, title ?: string }) {
  const [toggles, setToggles] = useState<Array<boolean>>(new Array(rubric.length).fill(false))
  const [ratings, setRatings] = useState<Array<number >>(new Array(rubric.length).fill(  0  ))

  function setToggle(i: number, value: boolean) {
    const newToggles = toggles.slice()
    newToggles[i] = value
    setToggles(newToggles)
  }

  function setRating(i: number, value: number) {
    const newRatings = ratings.slice()
    newRatings[i] = value
    setRatings(newRatings)
  }

  function reset() {
    setToggles(new Array(rubric.length).fill(false))
    setRatings(new Array(rubric.length).fill(  0  ))
  }

  return (
    <div className="relative flex flex-col gap-2">
      <Sticky rubric={rubric} title={title} toggles={toggles} ratings={ratings}/>
      {rubric.map((criteria, i) => {
        switch(criteria.type) {
          case "toggle": return <Toggle key={i} index={i} {...criteria} toggle={toggles[i]} setToggle={setToggle} />
          case "rating": return <Rating key={i} index={i} {...criteria} rating={ratings[i]} setRating={setRating}/>
        }
      })}
      <div className="flex flex-row justify-end">
        <a className="btn btn-ghost" onClick={reset}>
          <Trash/>
        </a>
      </div>
    </div>
  )
}