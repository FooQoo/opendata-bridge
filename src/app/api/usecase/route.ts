import UsercaseList from 'components/organisms/UsecaseList/UsecaseList';
import { getSdk } from 'lib/generated/client';
import { gqlClient } from 'lib/gqlClient/gqlCleint';
import { UsecaseProps } from 'types/usecase';

export async function POST(req: Request) {
  console.info('POST ' + req.url);

  const usecase: UsecaseProps = await req.json();

  try {
    const response = await getSdk(gqlClient).create({
      input: {
        title: usecase.title,
        description: usecase.description,
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
