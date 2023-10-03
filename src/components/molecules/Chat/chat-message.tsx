// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import { Avatar, Link } from '@nextui-org/react';
import { Message } from 'ai';
import { CodeBlock } from 'components/atoms/Chat/codeblock';
import { IconOpenAI, IconUser } from 'components/atoms/Chat/icons';
import styles from 'components/molecules/Chat/chat-message.module.scss';
import { MemoizedReactMarkdown } from 'components/molecules/Chat/markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={styles.main}>
      <div
        className={
          'flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-md border shadow bg-white'
        }
      >
        {message.role === 'user' ? (
          <Avatar className="z-0" isBordered radius="sm" icon={<IconUser />} />
        ) : (
          <Avatar
            isBordered
            radius="sm"
            color="primary"
            className="z-0"
            icon={<IconOpenAI />}
          />
        )}
      </div>
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            ul({ children }) {
              return <ul className="list-disc ml-4">{children}</ul>;
            },
            ol({ children }) {
              return <ol className="list-decimal ml-4">{children}</ol>;
            },
            li({ children }) {
              return <li className="mb-2 last:mb-0">{children}</li>;
            },
            a({ children, ...props }) {
              return (
                <Link
                  isExternal
                  className="text-primary"
                  href={props.href}
                  showAnchorIcon
                >
                  {children}
                </Link>
              );
            },
            code({ node, className, children, ...rest }) {
              const match = /language-(\w+)/.exec(className || '');

              if (!match) {
                return (
                  <code className={className} {...rest}>
                    {children}
                  </code>
                );
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...rest}
                />
              );
            },
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
      </div>
    </div>
  );
}
