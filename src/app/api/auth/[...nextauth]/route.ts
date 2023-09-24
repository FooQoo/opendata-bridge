import { compare } from 'bcrypt';
import { getSdk } from 'lib/generated/client';
import { gqlClient } from 'lib/gqlClient/gqlCleint';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  debug: true,
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'ログイン',
      credentials: {
        username: {
          label: 'ユーザ名',
          type: 'text',
        },
        password: { label: 'パスワード', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username) {
          throw new Error('Wrong credentials. Try again.');
        }

        const res = await getSdk(gqlClient).getEditorByName({
          username: credentials?.username,
        });

        const { editor } = res;

        if (!editor) {
          throw new Error('Wrong credentials. Try again.');
        }

        const isValid = await compare(credentials.password, editor.password);

        if (!isValid) {
          throw new Error('Wrong credentials. Try again.');
        }

        return {
          id: editor.id,
          name: editor.username,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account, profile }) => {
      if (user) {
        token.user = user;
        const u = user as any;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: ({ session }) => {
      return {
        ...session,
        user: {
          ...session.user,
        },
      };
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
