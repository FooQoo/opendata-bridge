import { type UseChatHelpers } from 'ai/react';
import { ButtonScrollToBottom } from 'components/chatbot/button-scroll-to-bottom';
import { PromptForm } from 'components/chatbot/prompt-form';
import { Button } from 'components/chatbot/ui/button';
import { IconRefresh, IconStop } from 'components/chatbot/ui/icons';
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
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-4xl sm:px-4">
        <div className="flex h-10 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <IconStop className="mr-2" />
              回答を中断する
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button
                variant="outline"
                onClick={() => reload()}
                className="bg-background"
              >
                <IconRefresh className="mr-2" />
                もう一度やり直す
              </Button>
            )
          )}
        </div>
        {messages?.length > 0 && (
          <div className="flex justify-center">
            <div className="mt-2 mb-10 max-w-2xl w-full border bg-background px-4 py-2 shadow-lg sm:rounded-xl sm:border md:py-4">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
