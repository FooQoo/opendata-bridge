import Articles from 'app/Articles';
import { Layout } from 'components/projects/Layout/Layout';
import { use } from 'react';
import { Article } from 'types/article';

import styles from '../styles/Home.module.scss';

const articlesFeatcher: () => Promise<Article[]> = async () => {
  const res = await fetch('http://localhost:3000/api/article/list', {
    next: { revalidate: 30 },
  });
  const articles = await res.json();
  return articles;
};

const Home = () => {
  // const { articles, isLoading, isError } = useArticles();
  const articles = use(articlesFeatcher());

  return (
    <Layout>
      <main className={styles.main}>
        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>app/page.tsx</code>
        </p>

        <div className={styles.grid}>
          <Articles articles={articles} />
        </div>
      </main>
    </Layout>
  );
};

export default Home;

// export async function getStaticProps() {
//   // `getStaticProps` is executed on the server side.
//   const articles = await articlesFeatcher();
//   return {
//     props: {
//       fallback: {
//         fetchArticlePath: articles,
//       },
//     },
//   };
// }

// export default function Page({ fallback }: { fallback: Article[] }) {
//   // SWR hooks inside the `SWRConfig` boundary will use those values.
//   return (
//     <SWRConfig value={{ fallback }}>
//       <Home />
//     </SWRConfig>
//   );
// }
