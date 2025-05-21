import type { TQuestion } from "@/modules/question";

export default function Question({ question }: { question: TQuestion }) {
  return <div>{question.question}</div>;
}
