'use client';
import UsercaseList from 'components/organisms/UsecaseList/UsecaseList';
import usecaseSearchFeatcher, {
  fetchUsecasePath,
} from 'lib/axios/usecaseSearchFetcher';
import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { queryState } from 'recoil/queryState';
import useSWR from 'swr';
import { UsecaseProps } from 'types/usecase';

const PromptTemplateList = ({ initial }: { initial: UsecaseProps[] }) => {
  const query = useRecoilValue(queryState);

  const { data: usecases = [], error } = useSWR(
    [fetchUsecasePath, query],
    ([_, query]) => usecaseSearchFeatcher(query),
    { fallbackData: initial }
  );

  if (error) {
    console.error('Error fetching usecases:', error);
  }

  return (
    <Suspense fallback={<div className="h-screen">Loading...</div>}>
      <p className="mx-5 py-2 md:text-left text-center">
        プロンプトテンプレート
      </p>
      <UsercaseList usecases={usecases} />
    </Suspense>
  );
};

export default PromptTemplateList;
