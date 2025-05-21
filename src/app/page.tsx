"use client";

import { useEffect, useState } from "react";
import { getQuestion, type TQuestion } from "@/modules/question";
import Question from "@/components/question";
import { useRouter } from "next/navigation";

export default function Home() {
  
  const [thisQuestion, setThisQuestion] = useState<TQuestion | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const question = getQuestion();
    setThisQuestion(question);
    console.log(question);
  }, []);

  const handleQuestionSubmit = () => {
    router.refresh();
  };

  return (
    <div>
      {thisQuestion && <Question question={thisQuestion} onSubmit={handleQuestionSubmit} />}
    </div>
  );
}
