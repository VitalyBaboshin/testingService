import { FC, useState } from 'react';
import { observer } from 'mobx-react';
import { QuestionsStore } from 'pages/Testing/stores/QuestionsStore';
import { AnswerQuestionWrapper } from '../AnswerQuestionWrapper';

export const DetailedQuestion: FC = observer(() => {
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
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Введите ваш развернутый ответ"
        rows={6} // Количество строк в текстовом поле
        style={{ width: '100%', resize: 'none' }} // Стиль для ширины и запрета изменения размера
      />
    </AnswerQuestionWrapper>
  );
});
