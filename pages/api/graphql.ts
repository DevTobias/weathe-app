import { ApolloServer } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import { createContext } from '@Lib/graphql/context';
import { schema } from '@Lib/graphql/schema';

const apolloServer = new ApolloServer({
  context: createContext,
  schema,
});

const startServer = apolloServer.start();

/**
 * Access the Apollo GraphQL Server.
 *
 * @returns The Apollo server handler.
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Set corresponding cors headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'https://studio.apollographql.com');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );

  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
};

export default handler;

// Apollo Server Micro takes care of body parsing by its own
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
