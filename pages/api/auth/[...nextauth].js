/* eslint-disable no-param-reassign */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options = {
  providers: [
    CredentialsProvider({
      // name: "Credentials",
      // credentials: {
      //   username: { label: "UserName", type: "text" },
      //   password: { label: "Password", type: "password" },
      // },
      async authorize(credentials) {
        // if (credentials.username && credentials.password) {
        //   const { data, errRes } = await axios
        //     .post("http://10.10.20.18:8082/api/v1/authenticate", {
        //       userName: credentials.username,
        //       password: credentials.password,
        //       role: credentials.role,
        //     })
        //     .then((res) => {
        //       const data = res && res.data;
        //       return { data };
        //     })
        //     .catch((err) => {
        //       const errRes = err?.response?.data;
        //       return { errRes };
        //     });
        // if (data) {
        //   return { id: 20, name: "suhil", email: "suhil@gmail.com" };
        // } else if (errRes) {
        //   toastify("wrong credentials", "error");
        //   return null;
        // }
        // }
        if (
          credentials.username === "admin@gmail.com" &&
          credentials.password === "Admin@123"
        ) {
          return {
            id: 20,
            name: "suhilkm",
            email: "suhil@gmail.com",
            role: credentials.role,
            roleId: credentials.roleId,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.user = user;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token?.id) {
        session.id = token.id;
        session.user = token.user;
      }
      return session;
    },
    // async signIn({ user, account, profile, email, credentials }) {
    //   if (user.id) {
    //     return "/";
    //   }
    //   return "/loginerror";
    // },
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
