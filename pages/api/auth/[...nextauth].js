import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      credentials: {
        username: { label: "UserName", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        if (
          credentials.username === "suhil" &&
          credentials.password === "123"
        ) {
          return { id: 20, name: "suhil", email: "suhil@gmail.com" };
        }
        return null;
      },
    }),
  ],
  // pages: {
  //   signIn: "/login",
  // },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token?.id) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: "123",
  jwt: { secret: "123", encryption: true },
};

export default async function auth(req, res) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, options);
}
