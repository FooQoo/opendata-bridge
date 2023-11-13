'use client';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Skeleton, useDisclosure } from '@nextui-org/react';
import UsecaseModal from 'app/UsecaseModal';
import usecaseSearchFeatcher, {
  fetchUsecasePath,
} from 'lib/axios/usecaseSearchFetcher';
import { useRecoilValue } from 'recoil';
import { queryState } from 'recoil/queryState';
import useSWR from 'swr';
import { UsecaseProps } from 'types/usecase';

import styles from './PromptTemplateList.module.scss';

const Usecase = (usecase: UsecaseProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className={styles.card} onClick={onOpen}>
        <h2>{usecase.title}</h2>
        <p className="flex-grow">{usecase.description}</p>
        <div className="text-sm grid grid-cols-2 h-[20px]">
          <div />
          <span className="text-right">最終更新日:{usecase.updatedAt}</span>
        </div>
      </div>
      <UsecaseModal
        usecase={usecase}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

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
        オープンデータ登録情報が見つかりませんでした
      </p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 mx-auto justify-items-center">
        {data.map((usecase, index) => (
          <Usecase key={index} {...usecase} />
        ))}
      </div>
    );

  return (
    <>
      <h2 className="mx-5 pb-20 text-center text-2xl">オープンデータ一覧</h2>
      {!query.isTyping && (!isLoading || query.isInitialRender) ? (
        usecaseResult
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-4 mx-4 justify-items-center">
          {[...Array(2)].map((_, index) => (
            <Card key={index} className={styles['empty-card']} radius="sm">
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
