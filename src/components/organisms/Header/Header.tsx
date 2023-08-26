import { FC } from 'react';

import styles from './Header.module.scss';

export const Header: FC = () => {
  return (
    <header>
      <h1 className={styles.title}>OpenData Bridge</h1>
    </header>
  );
};
