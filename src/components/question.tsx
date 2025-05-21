import type { TQuestion } from "@/modules/question";
import { scoreIntervals } from "@/modules/intervals";
import strings from "@/bin/strings.json";
import { useState, useEffect } from "react";

export default function Question({ 
  question, 
  onSubmit 
}: { 
  question: TQuestion;
  onSubmit: () => void;
}) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedIntervals, setSelectedIntervals] = useState<[number, number][]>([]);
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

  const handleIntervalChange = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const intervals: [number, number][] = [];
    checkboxes.forEach(checkbox => {
      if ((checkbox as HTMLInputElement).checked) {
        const x = parseInt(checkbox.getAttribute('data-x') || '0');
        const y = parseInt(checkbox.getAttribute('data-y') || '0');
        intervals.push([x, y]);
      }
    });
    setSelectedIntervals(intervals);
    if (intervals.length === 2) {
      checkboxes.forEach(checkbox => {
        if (!(checkbox as HTMLInputElement).checked) {
          (checkbox as HTMLInputElement).disabled = true;
        }
      });
    } else {
      checkboxes.forEach(checkbox => {
        (checkbox as HTMLInputElement).disabled = false;
      });
    }
  };

  const handleSubmit = () => {
    let isAnswerCorrect = false;
    switch (question.type) {
      case "msq":
        const selectedOptionsAreCorrect = selectedOptions.every(option =>
          question.msqCorrectAnswers.includes(option)
        );

        const unselectedOptionsAreCorrect = question.msqOptions
          .filter(option => !selectedOptions.includes(option))
          .every(option => !question.msqCorrectAnswers.includes(option));

          isAnswerCorrect = selectedOptionsAreCorrect && unselectedOptionsAreCorrect;
          setIsCorrect(isAnswerCorrect);
          setHasSubmitted(true);
          break;
      case "interval":
        isAnswerCorrect = scoreIntervals(selectedIntervals, question.meta);
        setIsCorrect(isAnswerCorrect);
        setHasSubmitted(true);
        break;
    }
  };

  const clearCheckedBoxes = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      (checkbox as HTMLInputElement).checked = false;
      (checkbox as HTMLInputElement).disabled = false;
    });
  };

  useEffect(() => {
    setSelectedOptions([]);
    setSelectedIntervals([]);
    clearCheckedBoxes();
    setIsCorrect(null);
    setHasSubmitted(false);
  }, [question]);

  return (
    <div className="p-4">
      <div className="text-lg font-medium mb-4">{question.question}</div>
      {question.extraText && <div className="text-sm text-gray-500 mb-4">{question.extraText}</div>}
      {question.type === "msq" && (
        <div className="space-y-2">
          {question.msqOptions.map((option) => (
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
      )}
      {question.type === "interval" && (
        <div className="grid grid-rows-6 gap-2">
          {[...Array(6)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex space-x-2">
              <span className="font-mono">{strings[rowIndex]}</span>
              {[...Array(8)].map((_, colIndex) => (
                <label key={colIndex} className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    data-x={colIndex}
                    data-y={rowIndex}
                    onChange={(e) => handleIntervalChange()}
                  />
                </label>
              ))}
            </div>
          ))}
        </div>
      )}
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
