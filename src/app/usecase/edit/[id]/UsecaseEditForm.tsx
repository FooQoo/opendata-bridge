'use client';

import { Button, Spinner } from '@nextui-org/react';
import UsecaseForm from 'components/organisms/UsecaseForm/UsecaseForm';
import { useState } from 'react';
import { UsecaseProps } from 'types/usecase';

// postUsecaseのHooks post処理を実行するcallback関数, error, loadingを返す
const useUpdateUsecase = () => {
  const [loading, setLoading] = useState(false);

  const callback = async (usecase: UsecaseProps) => {
    try {
      await fetch(`/api/usecase/${usecase.id}`, {
        method: 'PUT',
        body: JSON.stringify(usecase),
      });
    } catch (e) {
      console.error(e);
      return false;
    }

    return true;
  };

  const updateUsecase = async (usecase: UsecaseProps) => {
    setLoading(true);
    const flag = await callback(usecase);
    setLoading(false);
    return flag;
  };

  return { loading, updateUsecase };
};

const UsecaseCreateForm = ({ init }: { init: UsecaseProps }) => {
  const { loading, updateUsecase } = useUpdateUsecase();

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
              const isSuccess = await updateUsecase(usecase);
              alert(isSuccess ? '更新しました' : '更新に失敗しました');
            }}
          >
            更新
          </Button>
        )}
      </div>
    </>
  );
};

export default UsecaseCreateForm;
