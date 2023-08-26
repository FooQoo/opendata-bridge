// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { stub } from 'app/api/usecase/stub';

export async function GET(req: Request) {
  console.info('GET ' + req.url);

  const { searchParams } = new URL(req.url);
  const query = (searchParams.get('q') as string) || '';

  let json = stub;

  if (query) {
    json = stub.filter((s) => {
      return (
        s['template_title']
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()) ||
        s['template_description']
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase())
      );
    });
  }
  return new Response(JSON.stringify(json), {
    status: 200,
  });
}
