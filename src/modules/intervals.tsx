import { intervals, natLangIntervalMap } from "@/modules/constants";
import { TQuestion } from "./question";

type THalfStepIntervals = {
  [key: string]: string[];
};

export const getIntervalQuestion = (): TQuestion => {
  const randomIndex = Math.floor(Math.random() * intervals.allIntervals.length);
  const randomInterval = intervals.allIntervals[randomIndex];

  return {
    type: "interval",
    topic: "intervals",
    question: `Select the notes to create a ${natLangIntervalMap[randomInterval as keyof typeof natLangIntervalMap] } interval`,
    meta: randomInterval,
  };
};

export const scoreIntervals = (
  selectedIntervals: [number, number][],
  questionInterval: string
) => {
  const lowestNote = selectedIntervals.reduce((lowest, current) =>
    current[1] > lowest[1] ? current : lowest
  );
  const highestNote = selectedIntervals.find(
    (interval) => interval !== lowestNote
  )!;
  const lowestString = lowestNote[1];
  const highestString = highestNote[1];
  const stringDifference = lowestString - highestString;
  const fretDifference = highestNote[0] - lowestNote[0];
  let halfStepsBetweenNotes = fretDifference + stringDifference * 5;

  // account for the B string being a 3rd instead of 4th
  if (lowestString > 1 && highestString <= 1) {
    halfStepsBetweenNotes--;
  }

  // account for when people invert selections by clicking high number frets on low strings
  halfStepsBetweenNotes = Math.abs(halfStepsBetweenNotes);

  // account for octaves
  while (halfStepsBetweenNotes > 12) {
    halfStepsBetweenNotes -= 12;
  }

  // account for unison
  if (halfStepsBetweenNotes === 0) { return false; }

  // get the interval from the half steps
  const thisInterval = (intervals.intervalsByHalfSteps as THalfStepIntervals)[
    halfStepsBetweenNotes.toString()
  ];

  return thisInterval.includes(questionInterval);
};
