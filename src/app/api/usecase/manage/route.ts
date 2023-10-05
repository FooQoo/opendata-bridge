import { authOptions } from 'app/api/auth/[...nextauth]/route';
import { getSdk } from 'lib/generated/client';
import { gqlClient } from 'lib/gqlClient/gqlCleint';
import { getServerSession } from 'next-auth/next';
import { UsecaseProps } from 'types/usecase';

export async function POST(req: Request) {
  console.info('POST ' + req.url);

  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ status: 403 }), {
      status: 403,
    });
  }

  const usecase: UsecaseProps = await req.json();

  try {
    const response = await getSdk(gqlClient).create({
      input: {
        title: usecase.title,
        description: usecase.description,
        dataset: usecase.ogps.filter((opg) => opg.url).map((ogp) => ogp.url),
        tableau:
          usecase.tableau && usecase.tableau.title && usecase.tableau.url
            ? {
                create: {
                  title: usecase.tableau.title,
                  url: usecase.tableau.url,
                },
              }
            : undefined,
        base: {
          create: {
            title: usecase.base.title,
            content: usecase.base.content,
          },
        },
        option: {
          create: usecase.option.map((option) => ({
            title: option.title,
            content: option.content,
          })),
        },
      },
    });

    const id = response.createPromptTemplate?.id;

    if (id) {
      await getSdk(gqlClient).publish({
        id,
      });
    }
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        status: 500,
      })
    );
  }

  return new Response(
    JSON.stringify({
      status: 201,
    })
  );
}
