'use client';

import { type Message, useChat } from 'ai/react';
import { ChatList } from 'components/chatbot/chat-list';
import { ChatPanel } from 'components/chatbot/chat-panel';
import { ChatScrollAnchor } from 'components/chatbot/chat-scroll-anchor';
import { EmptyScreen } from 'components/chatbot/empty-screen';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getMessageSearch, UsecaseProps } from 'types/usecase';

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[];
  usecase: UsecaseProps;
  id?: string;
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

  return (
    <>
      <div className={'pb-[200px] pt-4 md:pt-10 w-full'}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen append={append} usecase={usecase} />
        )}
      </div>

      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />
    </>
  );
}
