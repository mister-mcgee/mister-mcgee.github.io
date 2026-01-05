import clsx from "clsx";
import { Check, Lock, RefreshCcw, SquareCheckBig, Trash } from "lucide-react";
import { useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin, type TokenResponse } from "@react-oauth/google";

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
    <div className="p-4 rounded-md shadow-sm border border-base-200 flex flex-col gap-1 grow-on-hover break-inside-avoid">
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
  title   ?: string;
  questions: Question[];
  responses: number  [];
}

function countCompleteResponses(
  questions: Array<Question>, 
  responses: Array< number >
) {
  return responses.filter(s => s !== -1).length;
}

function countAccurateResponses (
  questions: Array<Question>, 
  responses: Array< number >
) {
  return responses.reduce((n, ci, i) => {
    return n + (questions[i].answer === ci ? 1 : 0)
  }, 0)
}

function getScore(
  questions: Array<Question>, 
  responses: Array< number >
) {
  const complete = countCompleteResponses(questions, responses);
  const accurate = countAccurateResponses(questions, responses);
  return complete && Math.round((accurate / complete) * 100);
}

function Sticky({ title, questions, responses }: StickyProps) {
  const complete  = countCompleteResponses(questions, responses);
  const accurate  = countAccurateResponses(questions, responses);
  const score     = getScore(questions, responses);

  const performance = (
    complete ===   0 ? { emoji: "🥱", label: "Not Started"      , style: "border-base-300 text-base-content/65 bg-base-200" } :
    score    === 100 ? { emoji: "🤩", label: "Perfect"          , style: "border-primary text-primary bg-primary/10" } :
    score    >=   85 ? { emoji: "😄", label: "Mastery"          , style: "border-success text-success-content dark:text-success bg-success/10" } :
    score    >=   70 ? { emoji: "👍", label: "Proficient"       , style: "border-warning text-warning-content dark:text-warning bg-warning/10" } :
                       { emoji: "😢", label: "Needs Improvement", style: "border-error   text-error-content   dark:text-error   bg-error/10"   }
  )

  const completeProgress = Math.round(complete / questions.length * 100);
  const accurateProgress = Math.round(accurate / questions.length * 100);

  return <div className="grow-on-hover sticky top-0 z-10 flex flex-col items-center gap-2 bg-base-100 rounded-md border border-base-200 shadow-sm p-4 break-inside-avoid">
    {!!title && <span className="font-semibold text-xl">{title}</span>}
    
    <div className="w-full h-4 relative bg-base-200 rounded-full overflow-hidden border-2 border-base-200">
      <div className="absolute bg-base-300 z-20 h-full" style={{ width: `${completeProgress}%` }}></div>
      <div className="absolute bg-success  z-30 h-full" style={{ width: `${accurateProgress}%` }}></div>
    </div>

    <div className="relative flex w-full gap-2 justify-between">
      <span className="flex flex-row items-center gap-2">
        <SquareCheckBig/> {complete} / {questions.length}
      </span>

      <span className={clsx("px-2 border rounded-md absolute left-1/2 transform -translate-x-1/2", performance.style)}>
        {performance.label} {performance.emoji}
      </span>

      <span>{accurate} / {complete} ({score}%)</span>
    </div>

  </div>
}

function Submit({ questions, responses, groupId, taskId, submission, setSubmission }: { 
  questions    : Question[], 
  responses    : number  [],
  groupId     ?: string    , 
  taskId      ?: string    ,
  submission   : Submission,
  setSubmission: (a: Submission) => void,

}) {
  const completed = countCompleteResponses(questions, responses) === questions.length;

  //login
  const login = useGoogleLogin({
    onSuccess: async ({access_token}) => {
      setAccessToken(access_token);
    },
    onError  : async ({       error}) => {
      console.log(error);
    },
  });

  // submission state
  const [accessToken, setAccessToken] = useState<string | undefined>();

  function onSubmit() {
    setSubmission(Submission.PENDING);

    const score = getScore(questions, responses);
    const data  = new URLSearchParams()
    data.append("data", JSON.stringify({
      accessToken,
      groupId: groupId ?? "[group]",
      taskId : taskId  ?? "[task]",
      score    ,
      responses,
    }));

    fetch("https://script.google.com/macros/s/AKfycbwyeVWA2u7NOHQSyUaf_-BeNkvUjRQNTQI3C1OpxbHRs6gXqACtHcnygY6PzJjtOaA/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded" 
      },
      body: data.toString()
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if(res.ok) {
        setSubmission(Submission.COMPLETE  );
      } else {
        setSubmission(Submission.INCOMPLETE);
      }
    })
  }

  return <>
    {!completed && (
      <div className="flex justify-center items-center rounded-lg grow caution p-2 text-base-content/65">
        <Lock className="w-5 h-5"/>
        <div className="divider divider-horizontal"></div>
        <span className="flex items-center text-sm italic">Answer remaining questions to unlock submissions.</span>
      </div>
    )}

    {completed && submission === Submission.INCOMPLETE &&  !accessToken && (
      <button className="btn btn-primary grow" onClick={() => login()}>
        Sign in to Submit
      </button>
    )}

    {completed && submission === Submission.INCOMPLETE && !!accessToken && (
      <button className="btn btn-primary grow" onClick={() => onSubmit()}>
        Submit ({getScore(questions, responses)}%)
      </button>
    )}

    {completed && submission === Submission.PENDING && (
      <button className="btn btn-primary grow" disabled>
        <span className="loading loading-dots"></span>
      </button>
    )}

    {completed && submission === Submission.COMPLETE && (
      <button className="btn btn-primary grow" disabled>
        <Check/>
      </button>
    )}
  </>
}

const Submission = {
  PENDING   : "pending",
  COMPLETE  : "complete",
  INCOMPLETE: "incomplete",
} as const

type Submission = typeof Submission[keyof typeof Submission];

export default function Quiz({ title, questions, groupId, taskId }: {
  title     ?: string
  questions  : Question[]
  groupId   ?: string
  taskId    ?: string
  shuffle   ?: boolean
}) {
  const [submission, setSubmission] = useState<Submission>(      Submission.INCOMPLETE      );
  const [responses , setResponses ] = useState< number[] >(Array(questions.length).fill(-1));  

  function onSelect(qi: number, ci: number) {
    const re = [...responses];
    re[qi]   =   ci;
    setResponses(re);
  }

  function onReset() {
    setResponses(new Array(questions.length).fill(-1));
  }

  return (
    <GoogleOAuthProvider clientId={"749413588250-nthuvm5m8u7n07b9qd1eegmmdg4nd8g0.apps.googleusercontent.com"}>
      <div className="relative flex flex-col gap-2">
        <Sticky title={title} questions={questions} responses={responses} />
        { questions.map((question, i) => {
          const qi =          i ;
          const ci = responses[i];
          
          return <Question {...question} key={i} qi={qi} ci={ci} onSelect={onSelect} />
        })}
        <div className="w-full flex items-center gap-2 print:hidden">
          <Submit {...{ questions, responses, groupId, taskId, submission, setSubmission }} />
          <button className="btn btn-ghost" onClick={onReset} disabled={submission !== Submission.INCOMPLETE}>
            <Trash/>
          </button>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}
