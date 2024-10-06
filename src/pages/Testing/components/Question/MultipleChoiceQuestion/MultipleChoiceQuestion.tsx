import { FC, useState } from 'react';
import { AnswerQuestionWrapper } from '../AnswerQuestionWrapper';
import { QuestionsStore } from 'pages/Testing/stores/QuestionsStore';

export const MultipleChoiceQuestion: FC = () => {
  const { selectedQuestion, onAnswer } = QuestionsStore;
  const options = selectedQuestion?.answersToQuestion;
  const question = selectedQuestion?.question

  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const toggleOption = (index: number) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  const handleSubmit = () => {
    if (selectedOptions.length > 0) {
      onAnswer(selectedOptions);
    }
  };

  return (
    <AnswerQuestionWrapper submit={handleSubmit} question={question}>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="checkbox"
            value={option}
            onChange={() => toggleOption(index)}
          />
          {option}
        </div>
      ))}
    </AnswerQuestionWrapper>
  );
};
