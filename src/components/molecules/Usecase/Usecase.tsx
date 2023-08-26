import Link from 'next/link';
import { getUsecaseUrl, UsecaseProps } from 'types/usecase';

import styles from './Usecase.module.scss';

const Usecase = (usecase: UsecaseProps) => (
  <div className={styles.card}>
    <Link href={getUsecaseUrl(usecase.id)}>
      <h2>{usecase.template_title}</h2>
      <p>{usecase.template_description}</p>
    </Link>
  </div>
);

export default Usecase;
