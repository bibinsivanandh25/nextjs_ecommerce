/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import axios from "axios";
import { getSession } from "next-auth/react";

const baseURL = `${process.env.DOMAIN}/api/v1`;

// axios.defaults.baseURL = baseURL;

const axiosInstance = axios.create({
  baseURL,
});

const setHeaders = (commmonHeaders) => {
  axiosInstance.defaults.headers.common = commmonHeaders;
};
// const user = useUserInfo();
let user;

console.log(user, "user");

axiosInstance.interceptors.request.use(async (config) => {
  config.headers = {
    "Access-Control-Allow-Origin": "*",
    ...config.headers,
    userId: await getSession().then((res) => {
      return res.user.id;
    }),
  };
  return config;
});

async function getLatestToken() {
  const { accessToken, error } = await getSession();
  // if (!error) store.dispatch(setToken(accessToken));
  return { accessTokem, error };
}

// axiosInstance.interceptors.request.use(
//   function (config) {
//     document.getElementById("loader").classList.add("loadContainer");
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   function (response) {
//     // document.body.classList.remove("spinner");
//     document.getElementById("loader").classList.remove("loadContainer");
//     return response;
//   },
//   function (error) {
//     // document.body.classList.remove("spinner");
//     document.getElementById("loader").classList.remove("loadContainer");
//     return Promise.reject(error);
//   }
// );

export { axiosInstance, setHeaders };
