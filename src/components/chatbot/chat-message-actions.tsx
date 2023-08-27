'use client';

import { type Message } from 'ai';
import { Button } from 'components/chatbot/ui/button';
import { IconCheck, IconCopy } from 'components/chatbot/ui/icons';

interface ChatMessageActionsProps extends React.ComponentProps<'div'> {
  message: Message;
}

export function ChatMessageActions({
  message,
  className,
  ...props
}: ChatMessageActionsProps) {
  const onCopy = () => {
    return (
      <div
        className={
          'flex items-center justify-end transition-opacity group-hover:opacity-100 md:absolute md:-right-10 md:-top-2 md:opacity-0'
        }
        {...props}
      >
        <Button variant="ghost" size="icon" onClick={onCopy}>
          <span className="sr-only">Copy message</span>
        </Button>
      </div>
    );
  };
}
