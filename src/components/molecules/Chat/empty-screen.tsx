import { Button, input, Textarea } from '@nextui-org/react';
import { Snippet } from '@nextui-org/react';
import { UseChatHelpers } from 'ai/react';
import CopyButton from 'components/atoms/CopyButton/CopyButton';
import { useState } from 'react';
import { Project } from 'types/project';
import { UsecaseProps } from 'types/usecase';

export function EmptyScreen({
  append,
  usecase,
}: Pick<UseChatHelpers, 'append'> & { usecase: Project }) {
  const [searchPrompt, setSearchPrompt] = useState<string>(usecase.prompt);

  return (
    <div className="mx-auto w-full max-w-full md:max-w-[80%] px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">{usecase.title}</h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          {usecase.description}
        </p>
        <p className="mb-2 leading-normal text-muted-foreground">
          以下のプロンプトテンプレートを編集してオープンデータを検索してみましょう。
        </p>
        <div className="flex justify-center items-center flex-col space-y-4">
          <div className="relative w-full my-10">
            <Textarea
              label={`${usecase.title}のプロンプト`}
              labelPlacement="inside"
              value={searchPrompt}
              maxRows={30}
              size="lg"
              onChange={(e) => setSearchPrompt(e.target.value)}
              classNames={{
                label: 'mr-10',
              }}
            />
            <div className="absolute top-4 right-4">
              <CopyButton value={searchPrompt} />
            </div>
          </div>
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
