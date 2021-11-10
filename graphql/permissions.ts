import { shield, rule, inputRule } from 'graphql-shield';
import { Session } from 'next-auth';
import { PrismaClient } from '@prisma/client';

export interface GraphQLContext {
  session: Session;
  prisma: PrismaClient;
}

const Query: { [key: string]: any } = {};
const Mutation: { [key: string]: any } = {};

export const addRulesForQuery = (name: string, rule: any) => {
  if (!Query[name]) {
    Query[name] = rule;
  } else {
    throw new Error(`Permission for Query '${name}' already exists`);
  }
};

export const addRulesForMutation = (name: string, rule: any) => {
  if (!Mutation[name]) {
    Mutation[name] = rule;
  } else {
    throw new Error(`Permission for Mutation '${name}' already exists`);
  }
};

export const isAuthenticated = rule()(async (parent, args, { session }: GraphQLContext) => {
  const user = session?.user;
  return user !== null;
});

export const isAdmin = rule()(async (parent, args, { session }: GraphQLContext) => {
  const user = session?.user;
  return !!user?.roles?.includes('ADMIN');
});

export const isAccessingOwnUser = rule()(async (parent, { id }, { session }: GraphQLContext) => {
  const user = session?.user;
  return user?.id === id;
});

export const isCreatingOwnRecord = rule()(async (parent, { data: { userId } }, { session }: GraphQLContext) => {
  const user = session?.user;
  return user?.id === userId;
});

export const validatePaginatedQueryInput = inputRule()(({ object, number, string }) => (
  object({
    first: number().positive().integer().max(30),
    after: string().uuid(),
  })
));

export const validateFindByIdInput = inputRule()(({ string, object }) => (object({ id: string().uuid() })));

export default shield({
  Query,
  Mutation,
}, {
  debug: process.env.NODE_ENV === 'development',
});
