import type { TQuestion } from "@/modules/question";
import { useState, useEffect } from "react";

export default function Question({ 
  question, 
  onSubmit 
}: { 
  question: TQuestion;
  onSubmit: () => void;
}) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleOptionChange = (option: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(option)) {
        return prev.filter(item => item !== option);
      }
      return [...prev, option];
    });
    setIsCorrect(null);
    setHasSubmitted(false);
  };

  const handleSubmit = () => {
    const selectedOptionsAreCorrect = selectedOptions.every(option =>
      question.correctAnswers.includes(option)
    );

    const unselectedOptionsAreCorrect = question.options
      .filter(option => !selectedOptions.includes(option))
      .every(option => !question.correctAnswers.includes(option));

    const isAnswerCorrect = selectedOptionsAreCorrect && unselectedOptionsAreCorrect;
    setIsCorrect(isAnswerCorrect);
    setHasSubmitted(true);

  };

  useEffect(() => {
    setSelectedOptions([]);
    setIsCorrect(null);
    setHasSubmitted(false);
  }, [question]);

  return (
    <div className="p-4">
      <div className="text-lg font-medium mb-4">{question.question}</div>
      <div className="space-y-2">
        {question.options.map((option) => (
          <label key={option} className="flex items-center space-x-2 cursor-pointer">
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
      <div className="mt-4 space-x-4">
        <button
          onClick={handleSubmit}
          disabled={hasSubmitted}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Answer
        </button>
        {hasSubmitted && (
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Next Question
          </button>
        )}
        {isCorrect !== null && (
          <div className={`mt-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect, try again'}
          </div>
        )}
      </div>
    </div>
  );
}
