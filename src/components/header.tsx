import type { TQuestionTopic } from "@/modules/question";
import Box from "@/components/box";

export default function Header(
  { topics, setTopics }: { topics: TQuestionTopic[], setTopics: (topics: TQuestionTopic[]) => void }
) {
  const handleTopicChange = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"].topic-checkbox');
    const selectedTopics: TQuestionTopic[] = [];
    checkboxes.forEach((checkbox) => {
      if ((checkbox as HTMLInputElement).checked) {
        const id = checkbox.id as TQuestionTopic;
        selectedTopics.push(id);
      }
    });
    setTopics(selectedTopics);
  };

  return (
    <Box>
      <h1>Music Theory</h1>
      <div className="flex flex-row gap-4">
        <input type="checkbox" id="modes" className="topic-checkbox" checked={topics.includes("modes")} onChange={() => handleTopicChange()} />
        <label htmlFor="modes">Modes</label>
        <input type="checkbox" id="intervals" className="topic-checkbox" checked={topics.includes("intervals")} onChange={() => handleTopicChange()}   />
        <label htmlFor="intervals">Intervals</label>
      </div>
    </Box>
  );
}
