'use client';
import { Card, Skeleton } from '@nextui-org/react';
import UsercaseList from 'components/organisms/UsecaseList/UsecaseList';
import usecaseSearchFeatcher, {
  fetchUsecasePath,
} from 'lib/axios/usecaseSearchFetcher';
import { Suspense, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { queryState } from 'recoil/queryState';
import useSWR from 'swr';
import { UsecaseProps } from 'types/usecase';

import styles from './PromptTemplateList.module.scss';

const PromptTemplateList = ({ initial }: { initial: UsecaseProps[] }) => {
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
        プロンプトテンプレートが見つかりませんでした
      </p>
    ) : (
      <UsercaseList usecases={data} />
    );

  return (
    <>
      <h2 className="mx-5 md:mx-28 py-2 md:text-left text-center">
        プロンプトテンプレート
      </h2>
      {!query.isTyping && (!isLoading || query.isInitialRender) ? (
        usecaseResult
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0  md:gap-4 mx-auto md:mx-[100px] justify-items-center">
          <Card className={styles.card} radius="sm">
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
          <Card className={styles.card} radius="sm">
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
          <Card className={styles.card} radius="sm">
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
        </div>
      )}
    </>
  );
};

export default PromptTemplateList;
