// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSdk } from 'lib/generated/client';
import { gqlClient } from 'lib/gqlClient/gqlCleint';
import { UsecaseProps } from 'types/usecase';

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  console.info('GET ' + req.url);

  let response = await getSdk(gqlClient).fetchPromptTemplate({
    id: params.id,
  });

  if (!response.promptTemplate) {
    return new Response(JSON.stringify({ status: 404 }), {
      status: 404,
    });
  }

  return new Response(
    JSON.stringify({
      id: response.promptTemplate.id,
      title: response.promptTemplate.title,
      description: response.promptTemplate.description,
      base: {
        title: response.promptTemplate.base.title,
        content: response.promptTemplate.base.content,
      },
      option: response.promptTemplate.option.map((option) => ({
        title: option.title,
        content: option.content,
      })),
    } as UsecaseProps),
    {
      status: 200,
    }
  );
}
