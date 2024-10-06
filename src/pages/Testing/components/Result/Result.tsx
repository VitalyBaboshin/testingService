import { FC } from "react";
import { observer } from "mobx-react";
import clsx from 'clsx';
import { QuestionsStore } from "pages/Testing/stores/QuestionsStore";

import styles from './result.module.scss'

export const Result: FC = observer(() => {
  const { result, isPending } = QuestionsStore;

  return (
    <div>
      {isPending && (
        <>
          <p>Loading...(sleep на 2 секунды)</p>
          <p>Тестирование завершено по времени, ваши ответы отправлены.</p>
          <p>Ожидайте получение результата.</p>
        </>
      )}
      {!isPending && result && (
        <>
          <p>Правильных ответов: {result.correctAnswers}</p>
          <h3 className={clsx({
            [styles.passed]: result.passed,
            [styles.failed]: result.passed,
          })} >{result.passed ? `тест пройден` : 'тест провален'}</h3>
        </>
      )}
    </div>
  )
});