import { FC } from 'react';
import { observer } from 'mobx-react';
import clsx from 'clsx';
import { IStepper } from './types';

import styles from './stepper.module.scss';

/** Возможно переиспользумый компонент, поэтому он вынесен в общую папку components */
export const Stepper: FC<IStepper> = observer((props) => {
  const { count, selected } = props;

  const countStep = new Array(count).fill(0);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', gridGap: '5px' }}>
      {countStep && (
        countStep.map((step, index) =>
          <div className={clsx(styles.item, {
            [styles.completed]: index < selected,
            [styles.selected]: index == selected,
            [styles.no_completed]: index > selected,
          })} key={index}>
          </div>)
      )
      }</div >
  );
});
