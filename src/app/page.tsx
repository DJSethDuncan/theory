"use client";

import { useEffect, useState, useCallback } from "react";
import { getQuestion, type TQuestion, type TQuestionTopic } from "@/modules/question";
import { config } from "@/modules/config";
import Box from "@/components/box";
import Header from "@/components/header";
import Question from "@/components/question";

export default function Home() {
  
  const [thisQuestion, setThisQuestion] = useState<TQuestion | null>(null);
  const [topics, setTopics] = useState<TQuestionTopic[]>(config.possibleQuestionTopics);

  const loadQuestion = useCallback(() => {
    const question = getQuestion({topics});
    setThisQuestion(question);
  }, [topics]);

  useEffect(() => {
    loadQuestion();
  }, [loadQuestion]);

  const handleGetNextQuestion = () => {
    loadQuestion();
  };

  return (
    <div>
      <Header topics={topics} setTopics={setTopics} />
      {topics.length > 0 && thisQuestion && <Question question={thisQuestion} getNextQuestion={handleGetNextQuestion} />}
      {topics.length === 0 && <Box>No topics selected</Box>}
    </div>
  );
}
