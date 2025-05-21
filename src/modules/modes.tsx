import easyModes from "@/bin/modes-easy.json";
import type { TQuestion } from "./question";

export const possibleIntervals = ["b2", "2", "#2", "b3", "3", "#3", "4", "b5", "5", "#5", "6", "m7", "M7"];

const modesArray = Object.entries(easyModes).map(([name, data]) => ({
  name,
  ...data
}));

export const getModeQuestion = (): TQuestion => {
  const randomIndex = Math.floor(Math.random() * modesArray.length);
  const randomMode = modesArray[randomIndex];
  const correctAnswersCount = Math.floor(Math.random() * 4) + 1;
  const incorrectAnswersCount = 4 - correctAnswersCount;

  const correctAnswers = getCorrectAnswers(randomMode.intervals, correctAnswersCount);
  const incorrectAnswers = getIncorrectAnswers(randomMode.intervals, incorrectAnswersCount);

  return {
    type: "modes",
    question: `Which intervals are in the ${randomMode.name} mode?`,
    correctAnswers: randomMode.intervals,
    options: [...correctAnswers, ...incorrectAnswers].sort(() => Math.random() - 0.5), // makes them random
  };
};

const getCorrectAnswers = (modeIntervals: string[], correctAnswersCount: number): string[] => {
  const shuffledAnswers = [...modeIntervals].sort(() => Math.random() - 0.5);
  return shuffledAnswers.slice(0, correctAnswersCount);
};

const getIncorrectAnswers = (correctAnswers: string[], incorrectAnswersCount: number): string[] => {
  const incorrectAnswers = [...new Set(possibleIntervals.filter(interval => !correctAnswers.includes(interval)))];
  return incorrectAnswers.slice(0, incorrectAnswersCount);
};
