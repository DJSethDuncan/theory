import { TQuestionTopic } from "./question";

type TConfig = {
  msqOptionCount: number;
  possibleQuestionTopics: TQuestionTopic[];
}

export const config: TConfig = {
  msqOptionCount: 4,
  possibleQuestionTopics: ["modes", "intervals"],
}