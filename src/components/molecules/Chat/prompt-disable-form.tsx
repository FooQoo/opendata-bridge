import { UseChatHelpers } from 'ai/react';
import { Button } from 'components/atoms/Chat/button';
import { IconArrowElbow } from 'components/atoms/Chat/icons';
import { useEnterSubmit } from 'hooks/use-enter-submit';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import Textarea from 'react-textarea-autosize';

export function PromptDisableForm() {
  return (
    <form>
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-4 sm:rounded-md sm:border">
        <Textarea
          rows={1}
          placeholder="質問回数の上限を超えたため、追加の質問はできません。"
          disabled={true}
          className="min-h-[60px] w-full resize-none bg-transparent py-[1.3rem] focus-within:outline-none sm:text-sm"
        />
        <div className="absolute right-0 top-4 sm:right-4">
          <Button type="submit" size="icon" disabled={true}>
            <IconArrowElbow />
          </Button>
        </div>
      </div>
    </form>
  );
}
