import Articles from 'app/Articles';
import { Layout } from 'components/projects/Layout/Layout';
import articlesFeatcher from 'lib/axios/articlesFetcher';
import { cache, Suspense, use } from 'react';
import styles from 'styles/Home.module.scss';

const Home = () => {
  // If you use ssg, you can use the following code.
  const articles = use(cache(articlesFeatcher)());

  return (
    <Layout>
      <main className={styles.main}>
        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>app/page.tsx</code>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <div className={styles.grid}>
            <Articles articles={articles} />
          </div>
        </Suspense>
      </main>
    </Layout>
  );
};

export default Home;
