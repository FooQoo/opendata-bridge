'use client';

import { Button, ButtonProps } from 'components/atoms/Chat/button';
import { IconArrowDown } from 'components/atoms/Chat/icons';
import { useAtBottom } from 'hooks/use-at-bottom';
import * as React from 'react';

export function ButtonScrollToBottom({ ...props }: ButtonProps) {
  const isAtBottom = useAtBottom();

  return (
    <Button
      variant="outline"
      size="icon"
      className={
        'absolute right-4 top-1 z-10 bg-background transition-opacity duration-300 sm:right-8 md:top-2 ' +
        isAtBottom
          ? 'opacity-0'
          : 'opacity-100'
      }
      onClick={() =>
        window.scrollTo({
          top: document.body.offsetHeight,
          behavior: 'smooth',
        })
      }
      {...props}
    >
      <IconArrowDown />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  );
}
