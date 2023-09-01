import { Button } from '@nextui-org/react';
import { UseChatHelpers } from 'ai/react/dist';
import { Prompt } from 'types/usecase';

const OptionModal = ({
  prompt,
  append,
}: Pick<UseChatHelpers, 'append'> & {
  prompt: Prompt;
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full space-y-5">
      <Button
        color="primary"
        onPress={() => {
          append({
            role: 'user',
            content: prompt.content,
          });
        }}
      >
        {prompt.title}
      </Button>
    </div>
  );
};

export default OptionModal;
