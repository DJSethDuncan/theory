import type { TQuestion } from "@/modules/question";
import IntervalQuestion from "./intervalQuestion";
import MultipleSelectQuestion from "./multipleSelectQuestion";
import { useState, useEffect } from "react";
import Button from "./button";

export default function Question({
  question,
  onSubmit,
}: {
  question: TQuestion;
  onSubmit: () => void;
}) {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    setIsCorrect(null);
    setHasSubmitted(false);
  }, [question]);

  return (
    <div className="p-4">
      <div className="text-lg font-medium mb-4">{question.question}</div>
      {question.extraText && (
        <div className="text-sm text-gray-500 mb-4">{question.extraText}</div>
      )}
      {question.type === "msq" && (
        <MultipleSelectQuestion
          question={question}
          answerCheck={setIsCorrect}
          hasSubmitted={hasSubmitted}
          setHasSubmitted={setHasSubmitted}
        />
      )}
      {question.type === "interval" && (
        <IntervalQuestion
          question={question}
          answerCheck={setIsCorrect}
          hasSubmitted={hasSubmitted}
          setHasSubmitted={setHasSubmitted}
        />
      )}
      <div className="mt-4 space-x-4">
        {hasSubmitted && (
          <Button onClick={onSubmit}>
            Next Question
          </Button>
        )}
        {isCorrect !== null && (
          <div
            className={`mt-2 ${isCorrect ? "text-green-600" : "text-red-600"}`}
          >
            {isCorrect ? "Correct!" : "Incorrect, try again"}
          </div>
        )}
      </div>
    </div>
  );
}
