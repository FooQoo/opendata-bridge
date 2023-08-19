'use client';
import Article from 'components/molecules/Article/Article';
import articlesFeatcher from 'lib/axios/articlesFetcher';
import { FC, use } from 'react';
import { ArticleProps } from 'types/article';

import styles from './ArticleList.module.scss';

export type ArticlesProps = {
  articles: ArticleProps[];
};

const ArticleList: FC<ArticlesProps> = ({ articles }) => {
  const articleList =
    articles && articles.length > 0 // if empty, fetch Article
      ? articles
      : use(articlesFeatcher());

  return (
    <div className={styles.grid}>
      {articleList.map(({ link, title, description }, index) => (
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
