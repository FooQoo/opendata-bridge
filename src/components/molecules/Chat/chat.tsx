'use client';

import { faFaceFrown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@nextui-org/react';
import { type Message, useChat } from 'ai/react';
import { ChatList } from 'components/molecules/Chat/chat-list';
import {
  ChatPanel,
  MAX_QUESTION_COUNT,
} from 'components/molecules/Chat/chat-panel';
import { ChatScrollAnchor } from 'components/molecules/Chat/chat-scroll-anchor';
import ConfirmFileModal from 'components/molecules/Chat/confirm-file-modal';
import { EmptyScreen } from 'components/molecules/Chat/empty-screen';
import OptionModal from 'components/molecules/Chat/option-modal';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Feedback } from 'types/feedback';
import { UsecaseProps } from 'types/usecase';

const postFeedback = async (feedback: Feedback) => {
  try {
    await fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(feedback),
    });
  } catch (e) {
    console.error(e);
    return false;
  }

  return true;
};

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[];
  usecase: UsecaseProps;
  id: string;
}

export function Chat({ id, initialMessages, usecase }: ChatProps) {
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        id,
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText);
        }
      },
    });

  const [canConfirmFile, setCanConfirmFile] = useState<boolean>(true);

  const [isFeedbacked, setIsFeedbacked] = useState<boolean>(false);

  const isLimit =
    messages.filter((message) => message.role === 'user').length >=
    MAX_QUESTION_COUNT;

  return (
    <>
      <div
        className={
          'pb-[200px] md:pb-[300px] pt-4 md:pt-10 w-full flex justify-center'
        }
      >
        {messages.length ? (
          <div className="max-w-2xl">
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
            {/* {isLoading == false && canConfirmFile && (
              <ConfirmFileModal
                append={append}
                setCanConfirmFile={setCanConfirmFile}
              />
            )} */}
            {isLoading === false && (
              <div className="space-y-10">
                {isLimit === false && (
                  <div className="grid md:grid-cols-3 gap-4 md:w-full md:mx-0 mx-[20%]">
                    {usecase.option.map((o) => {
                      return (
                        <OptionModal key={o.title} prompt={o} append={append} />
                      );
                    })}
                  </div>
                )}
                {canConfirmFile && (
                  <ConfirmFileModal
                    append={append}
                    setCanConfirmFile={setCanConfirmFile}
                  />
                )}
              </div>
            )}
            {canConfirmFile === false &&
              isFeedbacked === false &&
              isLoading === false && (
                <div className="flex flex-col justify-center items-center w-full space-y-5">
                  回答内容のフィードバックにご協力ください。
                  <div className="flex justify-center items-center w-full my-5">
                    <Button
                      className="mx-5"
                      endContent={<FontAwesomeIcon icon={faThumbsUp} />}
                      onPress={async () => {
                        await postFeedback({
                          usercaseId: id,
                          isGood: true,
                          isBad: false,
                        });
                        setIsFeedbacked(true);
                      }}
                    >
                      気に入った
                    </Button>
                    <Button
                      className="mx-5"
                      endContent={<FontAwesomeIcon icon={faFaceFrown} />}
                      onPress={async () => {
                        await postFeedback({
                          usercaseId: id,
                          isGood: false,
                          isBad: true,
                        });
                        setIsFeedbacked(true);
                      }}
                    >
                      いまいちだ
                    </Button>
                  </div>
                </div>
              )}
            {isFeedbacked && (
              <div className="flex flex-col justify-center items-center w-full space-y-5">
                フィードバックにご協力いただきありがとうございました。
                <a
                  className="flex justify-center items-center w-full my-5"
                  href="/"
                >
                  <Button className="mx-5">終了する</Button>
                </a>
              </div>
            )}
          </div>
        ) : (
          <EmptyScreen append={append} usecase={usecase} />
        )}
      </div>

      {0 < messages.length && (
        <ChatPanel
          id={id}
          isLoading={isLoading}
          stop={stop}
          append={append}
          reload={reload}
          messages={messages}
          input={input}
          setInput={setInput}
          isLimit={isLimit || !canConfirmFile}
        />
      )}
    </>
  );
}
