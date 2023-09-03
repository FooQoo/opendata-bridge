'use client';

import { Button, Spinner } from '@nextui-org/react';
import UsecaseForm from 'components/organisms/UsecaseForm/UsecaseForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UsecaseProps } from 'types/usecase';

// postUsecaseのHooks post処理を実行するcallback関数, error, loadingを返す
const usePostUsecase = () => {
  const [loading, setLoading] = useState(false);

  const callback = async (usecase: UsecaseProps) => {
    try {
      await fetch('/api/usecase', {
        method: 'POST',
        body: JSON.stringify(usecase),
      });
    } catch (e) {
      console.error(e);
      return false;
    }

    return true;
  };

  const postUsecase = async (usecase: UsecaseProps) => {
    setLoading(true);
    const flag = await callback(usecase);
    setLoading(false);
    return flag;
  };

  return { loading, postUsecase };
};

const UsecaseCreateForm = ({ init }: { init: UsecaseProps }) => {
  const router = useRouter();
  const { loading, postUsecase } = usePostUsecase();

  const [usecase, setUsecase] = useState<UsecaseProps>(init);

  return (
    <>
      <UsecaseForm usecase={usecase} setUsecase={setUsecase} />

      <div className="flex justify-center items-center">
        {loading ? (
          <Button className={`bg-gray-400 hover:bg-gray-700 py-2 px-4 rounded`}>
            <Spinner color="default"></Spinner>
          </Button>
        ) : (
          <Button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
            onClick={async () => {
              const isSuccess = await postUsecase(usecase);
              alert(isSuccess ? '作成しました' : '作成に失敗しました');
              if (isSuccess) {
                router.push('/');
                router.refresh();
              }
            }}
          >
            作成
          </Button>
        )}
      </div>
    </>
  );
};

export default UsecaseCreateForm;
