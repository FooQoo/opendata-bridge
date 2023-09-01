// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSdk } from 'lib/generated/client';
import { gqlClient } from 'lib/gqlClient/gqlCleint';
import { UsecaseProps } from 'types/usecase';

export async function GET(req: Request) {
  console.info('GET ' + req.url);

  const { searchParams } = new URL(req.url);
  const query = (searchParams.get('q') as string) || '';

  const response = await getSdk(gqlClient).fetchPromptTemplates({
    query,
  });

  const json = response.promptTemplates.map(
    (promptTemplate) =>
      ({
        id: promptTemplate.id,
        title: promptTemplate.title,
        description: promptTemplate.description,
        base: {
          title: promptTemplate.base.title,
          content: promptTemplate.base.content,
        },
        option: promptTemplate.option.map((option) => ({
          title: option.title,
          content: option.content,
        })),
      }) as UsecaseProps
  );

  return new Response(JSON.stringify(json), {
    status: 200,
  });
}
