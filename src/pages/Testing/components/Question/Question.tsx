import { FC } from 'react';

import { observer } from 'mobx-react';
import { QuestionsStore } from 'pages/Testing/stores/QuestionsStore';
import { EQuestionType } from 'pages/Testing/services';
import { SingleChoiceQuestion } from './SingleChoiceQuestion';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { ShortQuestion } from './ShortQuestion';
import { DetailedQuestion } from './DetailedQuestion';

import styles from './question.module.scss'

export const Question: FC = observer(() => {
  const { typeSelectedQuestion } = QuestionsStore;

  return (
    <div className={styles.wrapper}>
      {EQuestionType[typeSelectedQuestion] === EQuestionType.single && (
        <SingleChoiceQuestion />
      )}
      {EQuestionType[typeSelectedQuestion] === EQuestionType.multiple && (
        <MultipleChoiceQuestion />
      )}
      {EQuestionType[typeSelectedQuestion] === EQuestionType.short && (
        <ShortQuestion />
      )}
      {EQuestionType[typeSelectedQuestion] === EQuestionType.detailed && (
        <DetailedQuestion />
      )}
    </div >

  );
});
