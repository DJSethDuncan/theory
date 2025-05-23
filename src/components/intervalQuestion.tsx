import { guitarStrings } from "@/modules/constants";
import { scoreIntervals } from "@/modules/intervals";
import Button from "./button";
import Box from "./box";
import type { TIntervalQuestion } from "@/modules/question";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

// @TODO: this should change to a "fretboard" question of which "Interval" is a subtype
// maybe someday there is a "keyboard" question type that shows piano keys
export default function IntervalQuestion({
  question,
  hasSubmitted,
  answerCheck,
  setHasSubmitted,
  children,
}: {
  question: TIntervalQuestion;
  hasSubmitted: boolean;
  answerCheck: Dispatch<SetStateAction<boolean | null>>;
  setHasSubmitted: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  const [selectedIntervals, setSelectedIntervals] = useState<
    [number, number][]
  >([]);

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    clearCheckedBoxes();
  }, [question]);

  const clearCheckedBoxes = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"].interval-checkbox');
    checkboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
      (checkbox as HTMLInputElement).disabled = false;
    });
  };

  const handleSubmit = () => {
    const isAnswerCorrect = scoreIntervals(selectedIntervals, question.meta);
    answerCheck(isAnswerCorrect);
    setHasSubmitted(true);
  };

  const handleIntervalChange = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"].interval-checkbox');
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
      setIsDisabled(false);
      checkboxes.forEach((checkbox) => {
        if (!(checkbox as HTMLInputElement).checked) {
          (checkbox as HTMLInputElement).disabled = true;
        }
      });
    } else {
      setIsDisabled(true);
      checkboxes.forEach((checkbox) => {
        (checkbox as HTMLInputElement).disabled = false;
      });
    }
  };

  return (
    <Box>
      <div className="grid grid-rows-6 gap-2">
        {[...Array(6)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex space-x-2">
            <span className="font-mono">{guitarStrings[rowIndex]}</span>
            {[...Array(8)].map((_, colIndex) => (
              <label key={colIndex} className="flex items-center">
                <input
                  type="checkbox"
                  className={`interval-checkbox h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 `}
                  data-x={colIndex}
                  data-y={rowIndex}
                  onChange={() => handleIntervalChange()}
                /> &nbsp; {colIndex > 0 ? "--|--" : "--"}
              </label>
            ))}
          </div>
        ))}
      </div>
      {!hasSubmitted && (
        <Box>
          <Button onClick={handleSubmit} type={isDisabled ? 'secondary' : 'primary'} disabled={isDisabled}>
            Submit Answer
          </Button>
        </Box>
      )}
      {children}
    </Box>
  );
}
