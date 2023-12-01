import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: (process.env.PROMPT_TEMPLATE_ENDPOINT || '') + '/graphql',
  documents: 'src/**/*.gql',
  generates: {
    './src/lib/generated/client.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
