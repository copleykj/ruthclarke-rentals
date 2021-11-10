import { prisma } from '../lib/prisma';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { IncomingMessage } from 'http';

export interface Context {
  prisma: typeof prisma;
  session: Session | null;
};

interface createContextArgs {
  req: IncomingMessage;
}

export async function createContext ({ req }: createContextArgs): Promise<Context> {
  const session = await getSession({ req });
  return {
    prisma,
    session,
  };
};
