'use client';
import SearchInput from 'components/atoms/SearchInput/SearchInput';
import ArticleList from 'components/organisms/ArticleList/ArticleList';
import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { queryState } from 'recoil/queryState';

import styles from './Home.module.scss';

const Home = () => {
  // If you use ssg, you can use the following code.
  const query = useRecoilValue(queryState);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <SearchInput />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <ArticleList query={query} />
      </Suspense>
    </main>
  );
};

export default Home;
