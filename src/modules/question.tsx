import { getModeQuestion } from "./modes";
import { getIntervalQuestion } from "./intervals";

export type TQuestionTopic = "modes" | "intervals";

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

export const getQuestion = ({topics}: {topics: TQuestionTopic[]}): TQuestion => {
  const randomIndex = Math.floor(Math.random() * topics.length);
  const questionTopic = topics[randomIndex];

  switch (questionTopic) {
    case "modes":
      return getModeQuestion();
    case "intervals":
      return getIntervalQuestion();
  }
};
