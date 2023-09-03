'use client';

import { Button, Spinner } from '@nextui-org/react';
import UsecaseForm from 'components/organisms/UsecaseForm/UsecaseForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UsecaseProps } from 'types/usecase';

// postUsecaseのHooks post処理を実行するcallback関数, error, loadingを返す
const useUpdateUsecase = () => {
  const [loadingUpdate, setLoading] = useState(false);

  const updateUsecase = async (usecase: UsecaseProps) => {
    setLoading(true);
    try {
      await fetch(`/api/usecase/${usecase.id}`, {
        method: 'PUT',
        body: JSON.stringify(usecase),
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
      });
    } catch (e) {
      console.error(e);
      setLoading(false);
      return false;
    }

    setLoading(false);

    return true;
  };

  return { loadingUpdate, updateUsecase };
};

// postUsecaseのHooks post処理を実行するcallback関数, error, loadingを返す
const useDeleteUsecase = () => {
  const [loadingDelete, setLoading] = useState(false);

  const deleteUsecase = async (usecase: UsecaseProps) => {
    setLoading(true);
    try {
      await fetch(`/api/usecase/${usecase.id}`, {
        method: 'DELETE',
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
      });
    } catch (e) {
      console.error(e);
      setLoading(false);
      return false;
    }

    setLoading(false);
    return true;
  };

  return { loadingDelete, deleteUsecase };
};

const UsecaseCreateForm = ({ init }: { init: UsecaseProps }) => {
  const router = useRouter();
  const { loadingUpdate, updateUsecase } = useUpdateUsecase();
  const { loadingDelete, deleteUsecase } = useDeleteUsecase();

  const [usecase, setUsecase] = useState<UsecaseProps>(init);

  return (
    <>
      <UsecaseForm usecase={usecase} setUsecase={setUsecase} />

      <div className="flex justify-center items-center">
        <div className="px-10">
          {loadingUpdate ? (
            <Button
              className={`bg-gray-400 hover:bg-gray-700 py-2 px-4 rounded`}
            >
              <Spinner color="default"></Spinner>
            </Button>
          ) : (
            <Button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
              onClick={async () => {
                const isSuccess = await updateUsecase(usecase);
                alert(isSuccess ? '更新しました' : '更新に失敗しました');
                router.refresh();
              }}
            >
              更新
            </Button>
          )}
        </div>
        <div className="px-10">
          {loadingDelete ? (
            <Button
              className={`bg-gray-400 hover:bg-gray-700 py-2 px-4 rounded`}
            >
              <Spinner color="default"></Spinner>
            </Button>
          ) : (
            <Button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
              onClick={async () => {
                const isSuccess = await deleteUsecase(usecase);
                alert(isSuccess ? '削除しました' : '削除に失敗しました');
                router.push('/');
                router.refresh();
              }}
            >
              削除
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default UsecaseCreateForm;
