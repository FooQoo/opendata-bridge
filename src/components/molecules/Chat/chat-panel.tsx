import { type UseChatHelpers } from 'ai/react';
import { Button } from 'components/atoms/Chat/button';
import { IconRefresh, IconStop } from 'components/atoms/Chat/icons';
import { ButtonScrollToBottom } from 'components/molecules/Chat/button-scroll-to-bottom';
import { PromptDisableForm } from 'components/molecules/Chat/prompt-disable-form';
import { PromptForm } from 'components/molecules/Chat/prompt-form';
import { m } from 'framer-motion';

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string;
}

export const MAX_QUESTION_COUNT = 4;

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
}: ChatPanelProps) {
  const systemMessageCount = messages.filter(
    (message) => message.role === 'user'
  ).length;

  return (
    <div className="fixed inset-x-0 bottom-0  from-muted/10 from-10% to-muted/30 to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-4xl sm:px-4">
        {systemMessageCount < MAX_QUESTION_COUNT && (
          <div className="flex h-10 items-center justify-center">
            {isLoading ? (
              <Button
                variant="outline"
                onClick={() => stop()}
                className="bg-white"
              >
                <IconStop className="mr-2" />
                回答を中断する
              </Button>
            ) : (
              messages?.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => reload()}
                  className="bg-white"
                >
                  <IconRefresh className="mr-2" />
                  もう一度やり直す
                </Button>
              )
            )}
          </div>
        )}

        <div className="flex justify-center">
          <div className="mt-2 md:mb-10 max-w-2xl w-full border bg-white px-4 py-2 shadow-lg sm:rounded-xl sm:border md:py-4">
            {systemMessageCount < MAX_QUESTION_COUNT ? (
              <PromptForm
                onSubmit={async (value) => {
                  await append({
                    id,
                    content: value,
                    role: 'user',
                  });
                }}
                input={input}
                setInput={setInput}
                isLoading={isLoading}
              />
            ) : (
              <PromptDisableForm />
            )}
            <p
              className={
                'px-2 pt-2 text-left text-xs leading-normal text-muted-foreground'
              }
            >
              残りの質問回数:{' '}
              {Math.max(MAX_QUESTION_COUNT - systemMessageCount, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
