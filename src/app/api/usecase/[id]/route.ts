// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { stub } from 'app/api/usecase/stub';

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  console.info('GET ' + req.url);

  let json = stub.filter((s) => {
    return s['id'] === parseInt(params.id);
  });

  if (json.length === 0) {
    return new Response(JSON.stringify({ status: 404 }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(json[0]), {
    status: 200,
  });
}
