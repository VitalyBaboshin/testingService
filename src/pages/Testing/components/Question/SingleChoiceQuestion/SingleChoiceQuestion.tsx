import { FC, useState } from 'react';
import { AnswerQuestionWrapper } from '../AnswerQuestionWrapper';
import { observer } from 'mobx-react';
import { QuestionsStore } from 'pages/Testing/stores/QuestionsStore';

export const SingleChoiceQuestion: FC = observer(() => {
  const { selectedQuestion, onAnswer } = QuestionsStore;
  const options = selectedQuestion?.answersToQuestion;
  const question = selectedQuestion?.question

  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedOption !== null) {
      onAnswer(selectedOption);
    }
  };

  return (
    <AnswerQuestionWrapper submit={handleSubmit} question={question}>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            name="single-choice"
            value={option}
            onChange={() => setSelectedOption(index)}
          />
          {option}
        </div>
      ))}
    </AnswerQuestionWrapper>
  );
});
