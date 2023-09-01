import { GraphQLClient } from 'graphql-request';

export const gqlClient = new GraphQLClient(
  process.env.PROMPT_TEMPLATE_ENDPOINT || '',
  {
    headers: {
      authorization: `Bearer ${process.env.CMS_READ_TOKEN}`,
    },
  }
);
