/* eslint-disable no-param-reassign */
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import toastify from "services/utils/toastUtils";
import * as jwt_decode from "jwt-decode";

const options = {
  providers: [
    CredentialsProvider({
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
        const payload = {
          userName: credentials.username,
          password: credentials.password,
          userType: credentials.role.toUpperCase(),
        };

        const { data } = await axios
          .post(`http://10.10.31.116:8001/api/v1/auth/authenticate`, payload)
          .catch((err) => {
            const errRes = err.response.data?.message;
            toastify(errRes, "error");
            throw Error(errRes);
          });
        if (data) {
          const { token } = data;
          const decoded = jwt_decode(token);
          const userData = decoded.sub.split(",");
          return {
            id: userData[0],
            user: {
              userId: userData[0],
              email: userData[1],
              role: decoded.roles[0],
            },
          };
        }
        return null;
        // if (
        //   credentials.username === "admin@gmail.com" &&
        //   credentials.password === "Admin@123"
        // ) {
        //   return {
        //     id: 20,
        //     name: "suhilkm",
        //     email: "suhil@gmail.com",
        //     role: credentials.role,
        //     roleId: credentials.roleId,
        //   };
        // }
        // return null;
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  callbacks: {
    jwt: async ({ token }) => {
      // console.log(user, "-=============");

      if (token) {
        return token;
      }
      return null;
    },
    session: ({ session, token }) => {
      console.log(token, "------------");
      console.log(session, "============");

      if (token?.id) {
        // session.id = token.id;
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
