'use client';
import Article from 'components/molecules/Article/Article';
import { FC } from 'react';
import { ArticleProps } from 'types/article';

import styles from './ArticleList.module.scss';

export type ArticlesProps = {
  articles: ArticleProps[];
};

const ArticleList: FC<ArticlesProps> = ({ articles }) => {
  const articleList = articles && articles.length > 0 ? articles : [];

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
