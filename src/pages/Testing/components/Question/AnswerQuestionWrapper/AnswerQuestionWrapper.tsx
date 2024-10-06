import { FC, PropsWithChildren } from 'react';
import { IAnswerQuestionWrapperProps } from './types';
import styles from './answerQuestionWrapper.module.scss';

export const AnswerQuestionWrapper: FC<PropsWithChildren<IAnswerQuestionWrapperProps>> = (props) => {
  const { submit, question, children } = props;

  return (
    <>
      <h5>{question}</h5>
      {children}
      <button onClick={submit} className={styles.button}>Submit</button>
    </>
  );
};
