import { FC, useEffect } from 'react';
import { observer } from 'mobx-react';

import styles from './testing.module.scss';

import { ITestingProps } from './types';
import { QuestionsStore } from './stores/QuestionsStore';
import { Stepper } from 'components/Stepper';
import { Question } from './components/Question';
import { Timer } from './components/Timer';
import { Result } from './components/Result';

export const Testing: FC<ITestingProps> = observer((props) => {
  const { userId } = props;
  const { init, isPending, count, selected, isFinished, totalTime } = QuestionsStore;

  useEffect(() => {
    if (userId) {
      init(userId)
    }
  }, [userId, init])

  return (
    <div className={styles.wrapper}>
      <header>
        <h2>Тестирование</h2>
        {!isFinished && totalTime && <Timer />}
      </header>

      {isFinished && <Result />}
      {!isFinished && (
        <main>
          {isPending && <div>Loading...</div>}
          {!isPending && (
            <>
              <Stepper count={count} selected={selected} />
              <Question />
            </>
          )}
        </main>
      )}
    </div>
  )
});
