import { UseChatHelpers } from 'ai/react';
import { ExternalLink } from 'components/chatbot/external-link';
import { Button } from 'components/chatbot/ui/button';
import { IconArrowRight } from 'components/chatbot/ui/icons';
import { use } from 'react';
import { UsecaseProps } from 'types/usecase';

const exampleMessages = [
  {
    heading: 'Explain technical concepts',
    message: `What is a "serverless function"?`,
  },
  {
    heading: 'Summarize an article',
    message: 'Summarize the following article for a 2nd grader: \n',
  },
  {
    heading: 'Draft an email',
    message: `Draft an email to my boss about the following: \n`,
  },
];

export function EmptyScreen({
  setInput,
  usecase,
}: Pick<UseChatHelpers, 'setInput'> & { usecase: UsecaseProps }) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">{usecase.template_title}</h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          {usecase.template_description}
        </p>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          <p>{usecase.search_prompt}</p>
          <p>{usecase.data_fetch_prompt}</p>
          <p>{usecase.data_format_prompt}</p>
        </div>
      </div>
    </div>
  );
}
