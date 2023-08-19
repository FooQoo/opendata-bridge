import { FC } from 'react';

import styles from './Header.module.scss';

export const Header: FC = () => {
  return (
    <header>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
    </header>
  );
};
