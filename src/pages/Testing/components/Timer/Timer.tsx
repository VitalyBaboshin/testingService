import styles from './timer.module.scss';
import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { QuestionsStore } from "pages/Testing/stores/QuestionsStore";

export const Timer: FC = observer(() => {
  const { timeLeft, decreaseTimer, saveLocalStorage } = QuestionsStore

  useEffect(() => {
    // Запуск таймера
    const interval = setInterval(() => {
      decreaseTimer()
    }, 1000);

    return () => clearInterval(interval);
  }, [decreaseTimer]);

  useEffect(() => {
    // Событие перед закрытием вкладки/браузера
    const handleBeforeUnload = () => {
      saveLocalStorage();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [saveLocalStorage]);

  return (
    <div className={styles.timer}>
      <div>{Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</div>
    </div>
  )
});