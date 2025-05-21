import { modesEasy, intervals } from "@/modules/constants";
import type { TQuestion } from "./question";

type TModeQuestionType = "intervalMSQ" | "identify";

const modesArray = Object.entries(modesEasy).map(([name, data]) => ({
  name,
  ...data,
}));

export const getModeQuestion = (): TQuestion => {
  const randomIndex = Math.floor(Math.random() * modesArray.length);
  const randomMode = modesArray[randomIndex];

  const questionType = getModeQuestionType();

  switch (questionType) {
    case "intervalMSQ":
      const correctAnswersCount = Math.floor(Math.random() * 4) + 1;
      const incorrectAnswersCount = 4 - correctAnswersCount;

      const correctAnswers = getCorrectAnswers(
        randomMode.intervals,
        correctAnswersCount
      );
      const incorrectAnswers = getIncorrectAnswers(
        randomMode.intervals,
        incorrectAnswersCount
      );

      return {
        topic: "modes",
        type: "msq",
        question: `Which intervals are in the ${randomMode.name} mode?`,
        msqCorrectAnswers: randomMode.intervals,
        msqOptions: [...correctAnswers, ...incorrectAnswers].sort(
          () => Math.random() - 0.5
        ), // makes them random
      };

    case "identify":
      return {
        topic: "modes",
        type: "msq",
        question: `Which mode is this?`,
        extraText: "R, " + randomMode.intervals.join(", "), // gotta have the root I guess
        msqCorrectAnswers: [randomMode.name],
        msqOptions: modesArray.map((mode) => mode.name),
      };
  }
};

const getCorrectAnswers = (
  modeIntervals: string[],
  correctAnswersCount: number
): string[] => {
  const shuffledAnswers = [...modeIntervals].sort(() => Math.random() - 0.5);
  return shuffledAnswers.slice(0, correctAnswersCount);
};

const getIncorrectAnswers = (
  correctAnswers: string[],
  incorrectAnswersCount: number
): string[] => {
  const incorrectAnswers = [
    ...new Set(
      intervals.allIntervals.filter(
        (interval) => !correctAnswers.includes(interval)
      )
    ),
  ];
  return incorrectAnswers.slice(0, incorrectAnswersCount);
};

const getModeQuestionType = (): TModeQuestionType => {
  const randomIndex = Math.floor(Math.random() * 2);
  return randomIndex === 0 ? "intervalMSQ" : "identify";
};
