import msq from "@/bin/msq.json";

export type TQuestionType = "msq";

export type TQuestion = {
  id: string;
  question: string;
  answers: string[];
  type: TQuestionType;
};

export const getQuestion = (): TQuestion => {
  const randomIndex = Math.floor(Math.random() * msq.length);
  return msq[randomIndex];
};

