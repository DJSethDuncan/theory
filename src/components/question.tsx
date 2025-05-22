import type { TQuestion } from "@/modules/question";
import IntervalQuestion from "./intervalQuestion";
import MultipleSelectQuestion from "./multipleSelectQuestion";
import { useState, useEffect } from "react";
import Button from "./button";
import Box from "./box";

export default function Question({
  question,
  getNextQuestion,
}: {
  question: TQuestion;
  getNextQuestion: () => void;
}) {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    setIsCorrect(null);
    setHasSubmitted(false);
  }, [question]);

  const nextQuestionButton = (
    <Box>
      <Button onClick={getNextQuestion}>
        Next Question
      </Button>
    </Box>
  );

  return (
    <Box>
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
          children={
            hasSubmitted && (
              nextQuestionButton
            )
          }
        />
      )}
      {question.type === "interval" && (
        <IntervalQuestion
          question={question}
          answerCheck={setIsCorrect}
          hasSubmitted={hasSubmitted}
          setHasSubmitted={setHasSubmitted}
          children={
            hasSubmitted && (
              nextQuestionButton
            )
          }
        />
      )}
      <Box>
        {isCorrect !== null && (
          <div
            className={`${isCorrect ? "text-green-600" : "text-red-600"}`}
          >
            {isCorrect ? "Correct!" : "Incorrect, try again"}
          </div>
        )}
      </Box>
    </Box>
  );
}
