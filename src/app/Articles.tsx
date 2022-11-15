'use client';
import Link from 'next/link';
import styles from 'styles/Home.module.scss';
import { Article } from 'types/article';

const Articles: React.FC<{
  articles: Article[];
}> = ({ articles }) => {
  return (
    <>
      {articles.map(({ link, title, description }, index) => (
        <Link href={link} className={styles.card} key={index}>
          <h2>{title} &rarr;</h2>
          <p>{description}</p>
        </Link>
      ))}
    </>
  );
};

export default Articles;
