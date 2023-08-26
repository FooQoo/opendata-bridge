import Article from 'components/molecules/Article/Article';
import articlesFeatcher from 'lib/axios/articlesFetcher';
import { FC, useEffect } from 'react';
import useSWR from 'swr';

import styles from './ArticleList.module.scss';

const ArticleList: FC<{ query: string }> = ({ query }: { query: string }) => {
  const { data, error } = useSWR(['/api/article/list', query], ([_, query]) =>
    articlesFeatcher(query)
  );

  if (error) {
    console.error('Error fetching articles:', error);
  }

  return (
    <div className={styles.grid}>
      {data?.map(({ link, title, description }, index) => (
        <Article
          key={index}
          link={link}
          title={title}
          description={description}
        />
      ))}
    </div>
  );
};

export default ArticleList;
