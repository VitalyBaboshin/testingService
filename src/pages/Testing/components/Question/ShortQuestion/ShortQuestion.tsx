import { useState } from 'react';
import { AnswerQuestionWrapper } from '../AnswerQuestionWrapper';
import { observer } from 'mobx-react';
import { QuestionsStore } from 'pages/Testing/stores/QuestionsStore';

export const ShortQuestion: FC = observer(() => {
  const { selectedQuestion, onAnswer } = QuestionsStore;
  const question = selectedQuestion?.question

  const [answer, setAnswer] = useState<string>('');

  const handleSubmit = () => {
    if (answer.trim() !== '') {
      onAnswer(answer);
      setAnswer('');
    }
  };

  return (
    <AnswerQuestionWrapper submit={handleSubmit} question={question}>
      <div>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Введите ваш ответ"
        />
      </div>
    </AnswerQuestionWrapper>
  );
});