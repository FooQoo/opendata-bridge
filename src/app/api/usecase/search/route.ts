// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSdk, ProjectEntity } from 'lib/generated/client';
import { gqlClient } from 'lib/gqlClient/gqlCleint';
import { Project, Resource } from 'types/project';

export async function GET(req: Request) {
  console.info('GET ' + req.url);

  const { searchParams } = new URL(req.url);
  const query = (searchParams.get('q') as string) || '';

  const queryList = query.split(/ |　/).map((query) => query.trim());

  const response: ProjectEntity[] =
    (query
      ? (
          await getSdk(gqlClient).searchProject({
            query: queryList.at(0) || '',
          })
        ).search?.projects
      : (await getSdk(gqlClient).fetchProject()).projects
    )?.data || [];

  const json: Project[] = response.map((project) => {
    const projectAttribute = project?.attributes;
    const resources: Resource[] =
      (projectAttribute?.resources?.data || []).map((attribute) => {
        return {
          title: attribute?.attributes?.title || '',
          url: attribute?.attributes?.url || '',
        };
      }) || [];
    return {
      id: project.id || '',
      title: projectAttribute?.title || '',
      description: projectAttribute?.description || '',
      resources,
      updatedAt:
        projectAttribute?.updatedAt.split('T')[0].replace(/-/g, '/') || '',
    };
  });

  return new Response(JSON.stringify(json), {
    status: 200,
  });
}
