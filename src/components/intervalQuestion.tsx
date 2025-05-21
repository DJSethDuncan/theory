import { guitarStrings } from "@/modules/constants";
import { scoreIntervals } from "@/modules/intervals";

import type { TIntervalQuestion } from "@/modules/question";
import { Dispatch, SetStateAction, useState } from "react";

// @TODO: this should change to a "fretboard" question of which "Interval" is a subtype
// maybe someday there is a "keyboard" question type that shows piano keys
export default function IntervalQuestion({
  question,
  hasSubmitted,
  answerCheck,
  setHasSubmitted,
}: {
  question: TIntervalQuestion;
  hasSubmitted: boolean;
  answerCheck: Dispatch<SetStateAction<boolean | null>>;
  setHasSubmitted: Dispatch<SetStateAction<boolean>>;
}) {
  const [selectedIntervals, setSelectedIntervals] = useState<
    [number, number][]
  >([]);

  const handleSubmit = () => {
    const isAnswerCorrect = scoreIntervals(selectedIntervals, question.meta);
    answerCheck(isAnswerCorrect);
    setHasSubmitted(true);
  };

  const handleIntervalChange = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const intervals: [number, number][] = [];
    checkboxes.forEach((checkbox) => {
      if ((checkbox as HTMLInputElement).checked) {
        const x = parseInt(checkbox.getAttribute("data-x") || "0");
        const y = parseInt(checkbox.getAttribute("data-y") || "0");
        intervals.push([x, y]);
      }
    });
    setSelectedIntervals(intervals);
    if (intervals.length === 2) {
      checkboxes.forEach((checkbox) => {
        if (!(checkbox as HTMLInputElement).checked) {
          (checkbox as HTMLInputElement).disabled = true;
        }
      });
    } else {
      checkboxes.forEach((checkbox) => {
        (checkbox as HTMLInputElement).disabled = false;
      });
    }
  };

  return (
    <div>
      <div className="grid grid-rows-6 gap-2">
        {[...Array(6)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex space-x-2">
            <span className="font-mono">{guitarStrings[rowIndex]}</span>
            {[...Array(8)].map((_, colIndex) => (
              <label key={colIndex} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  data-x={colIndex}
                  data-y={rowIndex}
                  onChange={() => handleIntervalChange()}
                />
              </label>
            ))}
          </div>
        ))}
      </div>
      {!hasSubmitted && (
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Answer
        </button>
      )}
    </div>
  );
}
