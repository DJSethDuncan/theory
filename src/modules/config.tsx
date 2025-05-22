import { TQuestionTopic } from "./question";

type TConfig = {
  msqOptionCount: number;
  possibleQuestionTopics: TQuestionTopic[];
}

export const config: TConfig = {
  msqOptionCount: 5,
  possibleQuestionTopics: ["modes", "intervals"],
}