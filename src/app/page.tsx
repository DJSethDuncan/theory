"use client";

import { useEffect, useState } from "react";
import { getQuestion, type TQuestion } from "@/modules/question";
import Question from "@/components/question";

export default function Home() {
  
  const [thisQuestion, setThisQuestion] = useState<TQuestion | null>(null);
  
  useEffect(() => {
    loadQuestion();
  }, []);

  const handleQuestionSubmit = () => {
    loadQuestion();
  };

  const loadQuestion = () => {
    const question = getQuestion();
    setThisQuestion(question);
  };

  return (
    <div>
      {thisQuestion && <Question question={thisQuestion} onSubmit={handleQuestionSubmit} />}
    </div>
  );
}
