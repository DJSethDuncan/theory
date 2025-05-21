"use client";

import { useEffect, useState } from "react";
import { getQuestion, type TQuestion } from "@/modules/question";
import Question from "@/components/question";

export default function Home() {
  
  const [thisQuestion, setThisQuestion] = useState<TQuestion | null>(null);
  
  useEffect(() => {
    const question = getQuestion();
    setThisQuestion(question);
    console.log(question);
  }, []);

  return (
    <div>
      {thisQuestion && <Question question={thisQuestion} />}
    </div>
  );
}
