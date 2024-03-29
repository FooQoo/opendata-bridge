'use client';
import { Card, Skeleton } from '@nextui-org/react';
import UsercaseList from 'components/organisms/UsecaseList/UsecaseList';
import usecaseSearchFeatcher, {
  fetchUsecasePath,
} from 'lib/axios/usecaseSearchFetcher';
import { useRecoilValue } from 'recoil';
import { queryState } from 'recoil/queryState';
import useSWR from 'swr';
import { Project } from 'types/project';

import styles from './PromptTemplateList.module.scss';

const PromptTemplateList = ({ initial }: { initial: Project[] }) => {
  const query = useRecoilValue(queryState);

  const { data, error, isLoading } = useSWR(
    !query.isTyping ? [fetchUsecasePath, query] : null,
    ([_, query]) => usecaseSearchFeatcher(query.query),
    { fallbackData: initial }
  );

  if (error) {
    console.error('Error fetching usecases:', error);
  }

  const usecaseResult =
    data.length === 0 ? (
      <p className="text-center text-default-500 py-20">
        オープンデータ登録情報が見つかりませんでした
      </p>
    ) : (
      <UsercaseList usecases={data} />
    );

  return (
    <>
      {!query.isTyping && (!isLoading || query.isInitialRender) ? (
        usecaseResult
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-4 mx-4 justify-items-center">
          {[...Array(2)].map((_, index) => (
            <Card key={index} className={styles.card} radius="sm">
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default PromptTemplateList;
