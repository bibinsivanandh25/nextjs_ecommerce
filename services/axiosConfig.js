/* eslint-disable no-param-reassign */
import axios from "axios";
import { config } from "dotenv";
import { getSession, signIn } from "next-auth/react";

const baseURL = `${process.env.DOMAIN}/api/v1`;

// axios.defaults.baseURL = baseURL;

const axiosInstance = axios.create({
  baseURL,
});

const setHeaders = (commmonHeaders) => {
  axiosInstance.defaults.headers.common = commmonHeaders;
};

axiosInstance.interceptors.request.use((config) => {
  config.headers = {
    "Access-Control-Allow-Origin": "*",
    ...config.headers,
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
