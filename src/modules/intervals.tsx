import { intervals } from "@/modules/constants";
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
    question: `Select the notes to create the ${randomInterval} interval`,
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
  if (highestString === 1 && lowestString > highestString) {
    halfStepsBetweenNotes--;
  }

  const thisInterval = (intervals.intervalsByHalfSteps as THalfStepIntervals)[
    halfStepsBetweenNotes.toString()
  ];

  return thisInterval.includes(questionInterval);
};
