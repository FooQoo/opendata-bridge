import { Divider } from '@nextui-org/react';
import { type Message } from 'ai';
import { ChatMessage } from 'components/chatbot/chat-message';

export interface ChatList {
  messages: Message[];
}

export function ChatList({ messages }: ChatList) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="relative mx-auto max-w-4xl px-4 w-full">
      {messages.map((message, index) => (
        <div key={index} className="w-full">
          <ChatMessage message={message} />
          {index < messages.length - 1 && <Divider className="my-4 md:my-8" />}
        </div>
      ))}
    </div>
  );
}
