import clsx from "clsx";
import { SquareCheckBig } from "lucide-react";
import { useState } from "react";

export interface Question {
  question: string;
  choices : string[];
  answer  : number;
  explain?: string;
};

interface QuestionProps extends Question {
  qi: number; // question index
  ci: number; // choice   index

  onSelect: (qi: number, ci: number) => void;
}

function Question({ qi, ci, question, choices, answer, explain, onSelect }: QuestionProps) {
  const isRight    = (ci === answer);
  const isWrong    = (ci !== answer);
  const isAnswered = (ci !== -1);
  
  return (
    <div className="p-4 rounded-md shadow-sm border border-base-200 flex flex-col gap-1 grow-on-hover">
      <span className="text-base-content font-medium">{qi + 1}. {question}</span>
      { choices.map((choice, i) => {
        const isRight    = (i  === answer);
        const isWrong    = (i  !== answer);
        const isSelected = (ci === i);
        const isDisabled = (isAnswered && !isSelected && !isRight);

        return <div key={i} className={clsx(
          "rounded border border-base-300 text-base-content px-4 py-2",
          isAnswered ? "cursor-default" : "cursor-pointer hover:bg-base-300",
          (isAnswered && isRight) && "border-success text-success-content dark:text-success bg-success/10",
          (isSelected && isWrong) && "border-error   text-error-content   dark:text-error   bg-error/10",
          isDisabled && "opacity-50",
        )} onClick={ () => { if(!isAnswered) onSelect(qi, i) }}> 
          { choice }
        </div>
      })}

      <span className="text-sm mt-4">
        { isAnswered && isRight && "✅ " }
        { isAnswered && isWrong && "❌ " }
        <span className={
          clsx(
            "italic",
            isRight && "text-success-content/75 dark:text-success/75",
            isWrong && "text-error-content/75 dark:text-error/75",
          )
        }>
          { isAnswered && explain }
        </span>
      </span>
    </div>
  )
}


interface StickyProps {
  quiz    : Question[];
  title  ?: string;
  selected: number  [];
}

function Sticky({ quiz, title, selected }: StickyProps) {
  const answered  = selected.filter(s => s !== -1).length;
  const correct   = selected.reduce((n, ci, i) => {
    return n + (quiz[i].answer === ci ? 1 : 0)
  }, 0)

  const score    = answered && Math.round((correct  / answered   ) * 100);
  const performance = (
    answered ===   0 ? { emoji: "🥱", label: "Not Started"      , style: "border-base-300 text-base-content/65 bg-base-200" } :
    score    === 100 ? { emoji: "🤩", label: "Perfect"          , style: "border-primary text-primary bg-primary/10" } :
    score    >=   85 ? { emoji: "😄", label: "Mastery"          , style: "border-success text-success-content dark:text-success bg-success/10" } :
    score    >=   70 ? { emoji: "👍", label: "Proficient"       , style: "border-warning text-warning-content dark:text-warning bg-warning/10" } :
                       { emoji: "😢", label: "Needs Improvement", style: "border-error   text-error-content   dark:text-error   bg-error/10"   }
  )

  const wrongProgress = Math.round(answered / quiz.length * 100);
  const rightProgress = Math.round(correct  / quiz.length * 100);

  return <div className="grow-on-hover sticky top-0 z-10 flex flex-col items-center gap-2 bg-base-100 rounded-md border border-base-200 shadow-sm p-4">
    <span className="w-full text-xl font-semibold text-center">
      {title}
    </span>

    <div className="relative flex w-full gap-2 justify-between">
      <span className="flex flex-row items-center gap-2">
        <SquareCheckBig/> {answered} / {quiz.length}
      </span>

      <span className={clsx("px-2 border rounded-md font-semibold absolute left-1/2 transform -translate-x-1/2", performance.style)}>
        {performance.label} {performance.emoji}
      </span>

      <span>{correct} / {answered} ({score}%)</span>
    </div>

    <div className="w-full h-4 relative bg-base-200 rounded-full overflow-hidden border-2 border-base-200">
      <div className="absolute bg-base-300 z-20 h-full" style={{ width: `${wrongProgress}%` }}></div>
      <div className="absolute bg-success  z-30 h-full" style={{ width: `${rightProgress}%` }}></div>
    </div>
  </div>
}

export default function Quiz({ quiz, title }: { 
  quiz     : Question[],
  title   ?: string ,
  shuffle ?: boolean,
}) {
  const [selected, setSelected] = useState<number[]>(Array(quiz.length).fill(-1));

  function onSelect(qi: number, ci: number) {
    const copy = [...selected];
    copy[qi]   =   ci;
    setSelected(copy);
  }

  function onReset() {
    setSelected(new Array(quiz.length).fill(-1));
  }

  return <div className="relative flex flex-col gap-2">
    <Sticky quiz={quiz} title={title} selected={selected} />
    { quiz.map((question, i) => {
      const qi =          i ;
      const ci = selected[i];
      
      return <Question {...question} key={i} qi={qi} ci={ci} onSelect={onSelect} />
    })}
    <div className="w-full flex justify-end">
      <button className="btn btn-ghost" onClick={onReset}>
        Reset
      </button>
    </div>
  </div>
}
