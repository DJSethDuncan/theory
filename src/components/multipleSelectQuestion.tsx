import type { TMSQQuestion } from "@/modules/question";
import Button from "./button";
import { Dispatch, SetStateAction, useState, useEffect } from "react";

export default function MultipleSelectQuestion({
  question,
  hasSubmitted,
  answerCheck,
  setHasSubmitted,
}: {
  question: TMSQQuestion;
  hasSubmitted: boolean;
  answerCheck: Dispatch<SetStateAction<boolean | null>>;
  setHasSubmitted: Dispatch<SetStateAction<boolean>>;
}) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      }
      return [...prev, option];
    });
  };

  useEffect(() => {
    setSelectedOptions([]);
  }, [question]);

  const handleSubmit = () => {
    const selectedOptionsAreCorrect = selectedOptions.every((option) =>
      question.msqCorrectAnswers.includes(option)
    );

    const unselectedOptionsAreCorrect = question.msqOptions
      .filter((option) => !selectedOptions.includes(option))
      .every((option) => !question.msqCorrectAnswers.includes(option));

    const isAnswerCorrect =
      selectedOptionsAreCorrect && unselectedOptionsAreCorrect;
    answerCheck(isAnswerCorrect);
    setHasSubmitted(true);
  };

  return (
    <div>
      <div className="space-y-2">
        {question.msqOptions.map((option) => (
          <label
            key={option}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionChange(option)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="font-mono">{option}</span>
          </label>
        ))}
      </div>
      {!hasSubmitted && (
        <Button onClick={handleSubmit}>
          Submit Answer
        </Button>
      )}
    </div>
  );
}
