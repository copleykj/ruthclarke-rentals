import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { applyMiddleware } from 'graphql-middleware';
import depthLimit from 'graphql-depth-limit';

import { schema } from '../../graphql/schema';
import { createContext } from '../../graphql/context';
import permissions from '../../graphql/permissions';

const cors = Cors({
  origin: process.env.NODE_ENV === 'development' ? 'https://studio.apollographql.com' : '*',
});
const apolloServer = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: createContext,
  validationRules: [depthLimit(10)],
});

const startServer = apolloServer.start();

export default cors(async function handler (req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
