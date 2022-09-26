/* eslint-disable no-param-reassign */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options = {
  providers: [
    CredentialsProvider({
      authorize(credentials) {
        if (credentials) {
          return {
            id: credentials.id,
            email: credentials.email,
            role: credentials.role,
            token: credentials.token,
          };
        }
        return null;
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.user = {
          id: user.id,
          email: user.email,
          role: user.role,
        };
        token.token = user.token;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token?.id) {
        session.user = token.user;
      }
      return session;
    },

    redirect: async ({ url, baseUrl }) => {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  secret: "123",
  jwt: { secret: "123", encryption: true },
};

export default async function auth(req, res) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  // eslint-disable-next-line no-return-await
  return await NextAuth(req, res, options);
}
