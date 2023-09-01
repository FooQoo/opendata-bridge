import { Button, Card, CardBody, Link, Textarea } from '@nextui-org/react';
import { UseChatHelpers } from 'ai/react';
import { MemoizedReactMarkdown } from 'components/chatbot/markdown';
import { CodeBlock } from 'components/chatbot/ui/codeblock';
import { useState } from 'react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { getMessageSearch, UsecaseProps } from 'types/usecase';

export function EmptyScreen({
  append,
  usecase,
}: Pick<UseChatHelpers, 'append'> & { usecase: UsecaseProps }) {
  const [searchPrompt, setSearchPrompt] = useState<string>(
    usecase.base.content
  );

  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">{usecase.title}</h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          {usecase.description}
        </p>
        <p className="mb-2 leading-normal text-muted-foreground">
          以下のプロンプトテンプレートを編集してオープンデータを検索してみましょう。
        </p>
        <div className="flex justify-center items-center flex-col space-y-4">
          <Textarea
            label={`${usecase.title}のプロンプト`}
            labelPlacement="inside"
            value={searchPrompt}
            maxRows={30}
            onChange={(e) => setSearchPrompt(e.target.value)}
          />
          <Button
            onClick={() =>
              append({
                role: 'user',
                content: searchPrompt,
              })
            }
            color="primary"
          >
            検索する
          </Button>
        </div>
      </div>
    </div>
  );
}
