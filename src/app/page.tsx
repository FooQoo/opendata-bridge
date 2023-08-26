'use client';
import SearchInput from 'components/atoms/SearchInput/SearchInput';
import ArticleList from 'components/organisms/ArticleList/ArticleList';
import articlesFeatcher from 'lib/axios/articlesFetcher';
import { cache, Suspense, use } from 'react';
import { useRecoilValue } from 'recoil';
import { queryState } from 'recoil/queryState';
import useSWR from 'swr';

import styles from './Home.module.scss';

const Home = () => {
  // If you use ssg, you can use the following code.
  const query = useRecoilValue(queryState);

  const { data } = useSWR(query, articlesFeatcher);

  const articles = data || [];

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <SearchInput />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <ArticleList articles={articles} />
      </Suspense>
    </main>
  );
};

export default Home;
