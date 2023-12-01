import axios from 'axios';
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
        email: {
          label: 'email',
          type: 'text',
        },
        password: { label: 'パスワード', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Wrong credentials. Try again.');
        }

        const user = await axios
          .post(
            (process.env.PROMPT_TEMPLATE_ENDPOINT || '') + '/api/auth/local',
            {
              identifier: credentials.email,
              password: credentials.password,
            }
          )
          .then((res) => {
            return {
              id: res.data.user.id,
              name: res.data.user.username,
            };
          })
          .catch(() => {
            return undefined;
          });

        if (!user) {
          throw new Error('Wrong credentials. Try again.');
        }

        return {
          id: user.id,
          name: user.name,
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
