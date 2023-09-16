// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSdk } from 'lib/generated/client';
import { gqlClient } from 'lib/gqlClient/gqlCleint';
import { countGood } from 'lib/postgres/feedback';
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

  return new Response(
    JSON.stringify({
      id: response.promptTemplate.id,
      title: response.promptTemplate.title,
      description: response.promptTemplate.description,
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

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  console.info('PUT ' + req.url);

  const usecase: UsecaseProps = await req.json();

  try {
    const response = await getSdk(gqlClient).update({
      id: params.id,
      input: {
        title: usecase.title,
        description: usecase.description,
        base: {
          update: {
            data: {
              title: usecase.base.title,
              content: usecase.base.content,
            },
            where: {
              id: usecase.base.id,
            },
          },
        },
        option: {
          update: usecase.option.map((option) => ({
            data: {
              title: option.title,
              content: option.content,
            },
            where: {
              id: option.id,
            },
          })),
        },
      },
    });

    if (!response.updatePromptTemplate) {
      return new Response(JSON.stringify({ status: 404 }), {
        status: 404,
      });
    }

    if (response.updatePromptTemplate.id) {
      await getSdk(gqlClient).publish({
        id: response.updatePromptTemplate.id,
      });
    }

    return new Response(JSON.stringify({ status: 200 }), {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ status: 500 }), {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  console.info('DELETE ' + req.url);

  try {
    const response = await getSdk(gqlClient).delete({
      id: params.id,
    });

    if (!response.deletePromptTemplate) {
      return new Response(JSON.stringify({ status: 404 }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ status: 200 }), {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ status: 500 }), {
      status: 500,
    });
  }
}
