import SearchInput from 'components/atoms/SearchInput/SearchInput';
import ArticleList from 'components/organisms/ArticleList/ArticleList';
import articlesFeatcher from 'lib/axios/articlesFetcher';
import { cache, Suspense, use } from 'react';

import styles from './Home.module.scss';

const Home = () => {
  // If you use ssg, you can use the following code.
  const articles = use(cache(articlesFeatcher)());

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
