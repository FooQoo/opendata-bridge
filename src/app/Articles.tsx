'use client';
import articlesFeatcher from 'lib/axios/articlesFetcher';
import Link from 'next/link';
import { FC, use } from 'react';
import { Article } from 'types/article';

import styles from './Articles.module.scss';

export type ArticlesProps = {
  articles: Article[];
};

const Articles: FC<ArticlesProps> = ({ articles }) => {
  const articleList =
    articles && articles.length > 0 // if empty, fetch Article
      ? articles
      : use(articlesFeatcher());

  return (
    <>
      {articleList.map(({ link, title, description }, index) => (
        <Link href={link} className={styles.card} key={index}>
          <h2>{title} &rarr;</h2>
          <p>{description}</p>
        </Link>
      ))}
    </>
  );
};

export default Articles;
