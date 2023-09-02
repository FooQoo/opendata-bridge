// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { create } from 'domain';
import { m } from 'framer-motion';
import { getSdk } from 'lib/generated/client';
import { gqlClient } from 'lib/gqlClient/gqlCleint';
import { UsecaseProps } from 'types/usecase';

export async function GET(req: Request) {
  console.info('GET ' + req.url);

  const { searchParams } = new URL(req.url);
  const query = (searchParams.get('q') as string) || '';

  const queryList = query.split(/ |　/).map((query) => query.trim());

  const response = await getSdk(gqlClient).fetchPromptTemplates({
    query: queryList.at(0) || '',
  });

  const json = response.promptTemplates
    .filter((promptTemplate) => {
      return queryList.slice(1).every((query) => {
        return (
          promptTemplate.title.includes(query) ||
          promptTemplate.description.includes(query) ||
          promptTemplate.base.title.includes(query) ||
          promptTemplate.base.content.includes(query) ||
          promptTemplate.option.some((option) => {
            return (
              option.title.includes(query) || option.content.includes(query)
            );
          })
        );
      });
    })
    .map(
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
          updatedAt: promptTemplate.updatedAt.split('T')[0].replace(/-/g, '/'),
        }) as UsecaseProps
    );

  return new Response(JSON.stringify(json), {
    status: 200,
  });
}
