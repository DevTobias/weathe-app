import { join } from 'path';
import { makeSchema } from 'nexus';
import * as types from './types';

export const schema = makeSchema({
  types: types,
  plugins: [],
  outputs: {
    typegen: join(process.cwd(), 'node_modules', '@types', 'nexus-typegen', 'index.d.ts'),
    schema: join(process.cwd(), 'lib', 'graphql', 'schema.graphql'),
  },
  contextType: {
    export: 'Context',
    module: join(process.cwd(), 'lib', 'graphql', 'context.ts'),
  },
  sourceTypes: {
    modules: [
      {
        module: '.prisma/client',
        alias: 'PrismaClient',
      },
    ],
  },
});
