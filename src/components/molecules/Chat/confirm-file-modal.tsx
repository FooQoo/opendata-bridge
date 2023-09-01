import { Button } from '@nextui-org/react';
import { UseChatHelpers } from 'ai/react/dist';

const ConfirmFileModal = ({
  append,
  setCanConfirmFile,
}: Pick<UseChatHelpers, 'append'> & {
  setCanConfirmFile: (canConfirmFile: boolean) => void;
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full space-y-5">
      <Button
        color="primary"
        onPress={() => {
          setCanConfirmFile(false);
          append({
            role: 'user',
            content:
              'これまでの回答に含まれるファイルのリンクを一覧で表示してください。',
          });
        }}
      >
        回答に含まれるファイル一覧を確認する
      </Button>
    </div>
  );
};

export default ConfirmFileModal;
