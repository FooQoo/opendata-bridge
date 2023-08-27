'use client';
import SearchInput from 'components/atoms/SearchInput/SearchInput';
import UsercaseList from 'components/organisms/UsecaseList/UsecaseList';
import usecaseSearchFeatcher, {
  fetchUsecasePath,
} from 'lib/axios/usecaseSearchFetcher';
import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { queryState } from 'recoil/queryState';
import useSWR from 'swr';

import styles from './Home.module.scss';

const Home = () => {
  // If you use ssg, you can use the following code.
  const query = useRecoilValue(queryState);

  const { data: usecases = [], error } = useSWR(
    [fetchUsecasePath, query],
    ([_, query]) => usecaseSearchFeatcher(query)
  );

  if (error) {
    console.error('Error fetching usecases:', error);
  }

  return (
    <div style={{ minWidth: '65%' }}>
      <div className={styles.hero}>
        <div className={styles.background}></div>
        <div className={styles.text}>
          <h1>Opendata Bridge</h1>
          <p>~ 使う人と作る人を繋げたい ~</p>
        </div>
      </div>
      <div className={styles.description}>
        <SearchInput />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <p className="px-5 py-2">プロンプトテンプレート</p>
        <UsercaseList usecases={usecases} />
      </Suspense>
    </div>
  );
};

export default Home;
