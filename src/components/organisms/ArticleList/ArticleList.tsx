import Article from 'components/molecules/Article/Article';
import { FC } from 'react';
import { ArticleProps } from 'types/article';

import styles from './ArticleList.module.scss';

export type ArticleListProps = {
  articles: ArticleProps[];
};

const ArticleList: FC<ArticleListProps> = ({ articles }: ArticleListProps) => {
  return (
    <div className={styles.grid}>
      {articles.map(({ link, title, description }, index) => (
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
