// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSdk } from 'lib/generated/client';
import { gqlClient } from 'lib/gqlClient/gqlCleint';
import { countGood } from 'lib/postgres/feedback';
import fetchOgp from 'service/ogpService';
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

  const goodCount = await countGood(response.promptTemplate.id);

  const ogps = await Promise.all(
    response.promptTemplate.dataset.map(async (v) => {
      return await fetchOgp(v);
    })
  );

  return new Response(
    JSON.stringify({
      id: response.promptTemplate.id,
      title: response.promptTemplate.title,
      description: response.promptTemplate.description,
      ogps: ogps.length > 0 ? ogps : [{ title: '', description: '', url: '' }],
      tableau: response.promptTemplate.tableau || {
        id: '',
        title: '',
        url: '',
      },
      base: {
        id: response.promptTemplate.base.id,
        title: response.promptTemplate.base.title,
        content: response.promptTemplate.base.content,
      },
      option: response.promptTemplate.option.map((option) => ({
        id: option.id,
        title: option.title,
        content: option.content,
      })),
      goodCount,
    } as UsecaseProps),
    {
      status: 200,
    }
  );
}
