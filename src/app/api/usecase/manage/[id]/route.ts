// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { authOptions } from 'app/api/auth/[...nextauth]/route';
import { getSdk } from 'lib/generated/client';
import { gqlClient } from 'lib/gqlClient/gqlCleint';
import { getServerSession } from 'next-auth/next';
import { UsecaseProps } from 'types/usecase';

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  console.info('PUT ' + req.url);

  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ status: 403 }), {
      status: 403,
    });
  }

  const usecase: UsecaseProps = await req.json();

  try {
    const response = await getSdk(gqlClient).update({
      id: params.id,
      input: {
        title: usecase.title,
        description: usecase.description,
        dataset: usecase.ogps.filter((ogp) => ogp.url).map((ogp) => ogp.url),
        tableau:
          usecase.tableau && usecase.tableau.title && usecase.tableau.url
            ? {
                upsert: {
                  data: {
                    create: {
                      title: usecase.tableau.title,
                      url: usecase.tableau.url,
                    },
                    update: {
                      title: usecase.tableau.title,
                      url: usecase.tableau.url,
                    },
                  },
                  where: {
                    id: usecase.tableau.id,
                  },
                },
              }
            : undefined,
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

  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ status: 403 }), {
      status: 403,
    });
  }

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
