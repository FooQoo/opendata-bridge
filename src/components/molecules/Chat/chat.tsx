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
import { Project } from 'types/project';

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[];
  usecase: Project;
  id: string;
}

const options = [
  {
    id: '1',
    title: '類義語で検索する',
    content: `Aを代替する検索ワードを3つ考え、それぞれについて検索を行ってください。
その後、Aとの関連性が高い検索結果を5件教えてください。

出力項目は以下でお願いいたします。
- データセットの名称
- データセットの説明
`,
  },
  {
    id: '2',
    title: '詳細を確認する',
    content: `これまで検索したデータセットを以下のフォーマットで出力してください。
- データセットの名称
- データセットのurl
- データセットの説明
- データセットのリソースの一覧
- フォーマット
- ライセンス
`,
  },
  {
    id: '3',
    title: 'もっと探す',
    content: `一つ前に検索した条件で、次のページを検索してください。
出力項目は以下でお願いいたします。
- データセットの名称
- データセットの説明
`,
  },
];

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
                {canConfirmFile && isLimit === false && (
                  <div className="grid md:grid-cols-3 gap-4 md:w-full md:mx-0 mx-[20%]">
                    {options.map((o) => {
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
                        setIsFeedbacked(true);
                      }}
                    >
                      気に入った
                    </Button>
                    <Button
                      className="mx-5"
                      endContent={<FontAwesomeIcon icon={faFaceFrown} />}
                      onPress={async () => {
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
                  href="/manage"
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
