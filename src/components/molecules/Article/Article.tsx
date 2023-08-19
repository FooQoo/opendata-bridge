import Link from 'next/link';
import { ArticleProps } from 'types/article';

import styles from './Article.module.scss';

const Article = ({ link, title, description }: ArticleProps) => (
  <Link href={link} className={styles.card}>
    <h2>{title} &rarr;</h2>
    <p>{description}</p>
  </Link>
);

export default Article;
