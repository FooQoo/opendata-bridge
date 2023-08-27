import { ExternalLink } from 'components/chatbot/external-link';
import React from 'react';

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={
        'px-2 text-center text-xs leading-normal text-muted-foreground'
      }
      {...props}
    >
      Open source AI chatbot built with{' '}
      <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> and{' '}
      <ExternalLink href="https://vercel.com/storage/kv">
        Vercel KV
      </ExternalLink>
      .
    </p>
  );
}
