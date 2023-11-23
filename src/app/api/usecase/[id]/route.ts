// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSdk } from 'lib/generated/client';
import { gqlClient } from 'lib/gqlClient/gqlCleint';
import { Project, Resource } from 'types/project';

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  console.info('GET ' + req.url);

  const project = (
    await getSdk(gqlClient).getProject({
      id: params.id,
    })
  ).project?.data;

  if (!project) {
    return new Response(JSON.stringify({ status: 404 }), {
      status: 404,
    });
  }

  const projectAttribute = project?.attributes;
  const resources: Resource[] =
    (projectAttribute?.resources?.data || []).map((attribute) => {
      return {
        title: attribute?.attributes?.title || '',
        url: attribute?.attributes?.url || '',
      };
    }) || [];
  const json: Project = {
    id: project.id || '',
    title: projectAttribute?.title || '',
    description: projectAttribute?.description || '',
    resources,
    updatedAt:
      projectAttribute?.updatedAt.split('T')[0].replace(/-/g, '/') || '',
  };

  return new Response(JSON.stringify(json), {
    status: 200,
  });
}
