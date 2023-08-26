'use client';
import SearchInput from 'components/atoms/SearchInput/SearchInput';
import UsercaseList from 'components/organisms/UsecaseList/UsecaseList';
import usecaseFeatcher from 'lib/axios/usecaseFetcher';
import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { queryState } from 'recoil/queryState';
import useSWR from 'swr';

import styles from './Home.module.scss';

const Home = () => {
  // If you use ssg, you can use the following code.
  const query = useRecoilValue(queryState);

  const { data: usecases = [], error } = useSWR(
    ['/api/usecase/list', query],
    ([_, query]) => usecaseFeatcher(query)
  );

  if (error) {
    console.error('Error fetching usecases:', error);
  }

  return (
    <>
      <div className={styles.description}>
        <SearchInput />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <UsercaseList usecases={usecases} />
      </Suspense>
    </>
  );
};

export default Home;
