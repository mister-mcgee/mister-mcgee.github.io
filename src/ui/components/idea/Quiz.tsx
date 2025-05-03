import { useState } from "react";

type Question = {
  question: string;
  choices: string[];
  answer: number;
  explain?: string;
};

export default function Quiz({ questions }: { questions: Question[] }) {
  const [selected, setSelected] = useState<number[]>(Array(questions.length).fill(-1));

  const handleSelect = (qIndex: number, choiceIndex: number) => {
    if (selected[qIndex] === -1) {
      const copy = [...selected];
      copy[qIndex] = choiceIndex;
      setSelected(copy);
    }
  };

  const handleReset = () => {
    setSelected(Array(questions.length).fill(-1));
  };

  const correctCount = selected.reduce(
    (acc, choice, i) => acc + (choice === questions[i].answer ? 1 : 0),
    0
  );

  const answeredCount = selected.filter((s) => s !== -1).length;
  const scorePercentage =
    answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  const performance =
    answeredCount === 0
      ? { label: "Not Started", color: "text-base-content", emoji: "🥱" }
      : scorePercentage === 100
      ? { label: "Perfect", color: "text-primary", emoji: "🤩" }
      : scorePercentage >= 85
      ? { label: "Mastery", color: "text-success", emoji: "😄" }
      : scorePercentage >= 70
      ? { label: "Satisfactory", color: "text-warning", emoji: "👍" }
      : { label: "Unsatisfactory", color: "text-error", emoji: "😢" };

  return (
    <div className="relative space-y-6 text-base-content">
      {/* Sticky Progress */}
      <div className="sticky top-0 z-10 bg-base-100 rounded-md shadow-sm py-2 px-4">
        <div className="flex items-center justify-between gap-4 text-lg">
          <div className={`whitespace-nowrap font-semibold ${performance.color}`}>
            {performance.emoji} {performance.label}
          </div>
          
          <div className="flex-1 h-3 bg-base-200 rounded overflow-hidden flex">
            <div
              className="bg-success h-full"
              style={{ width: `${(correctCount / questions.length) * 100}%` }}
            />
            <div
              className="bg-error h-full"
              style={{
                width: `${((answeredCount - correctCount) / questions.length) * 100}%`,
              }}
            />
          </div>
          <div className="whitespace-nowrap text-base-content">
            {answeredCount} / {questions.length}
          </div>

          <div className="whitespace-nowrap text-base-content">
            {Math.round((correctCount / questions.length) * 100)}%
          </div>
        </div>
      </div>

      {/* Questions */}
      {questions.map((q, i) => {
        const selectedIndex = selected[i];
        const isAnswered = selectedIndex !== -1;
        const isCorrect = selectedIndex === q.answer;

        return (
          <div key={i} className="p-4 rounded-md shadow-md space-y-2">
            <span className="text-base-content">
              {i + 1}. {q.question}
            </span>
            <div className="space-y-2">
              {q.choices.map((choice, j) => {
                const isThisCorrect = j === q.answer;
                const isThisSelected = selectedIndex === j;

                let choiceClass =
                  "block px-4 py-2 rounded border transition cursor-pointer text-base-content";

                if (isAnswered) {
                  choiceClass += isThisCorrect
                    ? " border-success text-success bg-success/10"
                    : isThisSelected
                    ? " border-error text-error bg-error/10"
                    : " opacity-50 cursor-default border-base-300";
                } else if (isThisSelected) {
                  choiceClass += " border-primary";
                } else {
                  choiceClass += " border-base-300";
                }

                return (
                  <div
                    key={j}
                    className={choiceClass}
                    onClick={() => handleSelect(i, j)}
                  >
                    {choice}
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            {isAnswered && q.explain && (
              <div
                className={`mt-2 p-3 rounded ${
                  isCorrect ? "text-success" : "text-error"
                }`}
              >
                {isCorrect ? "✅" : "❌"} {q.explain}
              </div>
            )}
          </div>
        );
      })}

      
      <div className="flex justify-center">
        <button className="btn btn-ghost btn-sm" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
