import NextAuth, { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { prisma } from '../../../lib/prisma';

const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        service: 'Mailjet',
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      const id = user?.id ?? '';
      session.user = {
        email: user?.email ?? '',
        id,
        roles: user.roles,
      };
      return session;
    },
  },
};

if (process.env.NODE_ENV === 'development') {
  options.cookies = {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        path: '/',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      },
    },
    callbackUrl: {
      name: 'next-auth.callback-url',
      options: {
        path: '/',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      },
    },
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        path: '/',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      },
    },
  };
};

export default NextAuth(options);
