import Link from 'next/link';
import { ArticleProps } from 'types/article';

import styles from './Article.module.scss';

const Article = ({ link, title, description }: ArticleProps) => (
  <div className={styles.card}>
    <Link href={link}>
      <h2>{title} &rarr;</h2>
      <p>{description}</p>
    </Link>
  </div>
);

export default Article;
