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
    <Button
      color="primary"
      onPress={() => {
        append({
          role: 'user',
          content: prompt.content,
        });
      }}
      className="w-max-[20px]"
    >
      {prompt.title}
    </Button>
  );
};

export default OptionModal;
