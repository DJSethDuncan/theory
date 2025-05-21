import { getModeQuestion } from "./modes";
import { getIntervalQuestion } from "./intervals";

const possibleQuestionTopics = ["modes", "intervals"];

type TQuestionTopic = "modes" | "intervals";

type TBaseQuestion = {
  topic: TQuestionTopic;
  question: string;
  extraText?: string;
};

export type TMSQQuestion = TBaseQuestion & {
  type: "msq";
  msqCorrectAnswers: string[];
  msqOptions: string[];
};

export type TIntervalQuestion = TBaseQuestion & {
  type: "interval";
  meta: string;
};

export type TQuestion = TMSQQuestion | TIntervalQuestion;

export const getQuestion = (): TQuestion => {
  const randomIndex = Math.floor(Math.random() * possibleQuestionTopics.length);
  const questionTopic = possibleQuestionTopics[randomIndex];

  switch (questionTopic) {
    case "modes":
      return getModeQuestion();
    case "intervals":
      return getIntervalQuestion();
    default:
      throw new Error(`Unknown question type: ${questionTopic}`);
  }
};
