import { getModeQuestion } from "./modes";

const possibleQuestionTypes = ["modes"];

export type TQuestionType = "modes";

export type TQuestion = {
  type: TQuestionType;
  question: string;
  extraText?: string;
  correctAnswers: string[];
  options: string[];
};

export const getQuestion = (): TQuestion => {
  const randomIndex = Math.floor(Math.random() * possibleQuestionTypes.length);
  const questionType = possibleQuestionTypes[randomIndex];

  switch (questionType) {
    case "modes":
      return getModeQuestion();
    default:
      throw new Error(`Unknown question type: ${questionType}`);
  }
};
