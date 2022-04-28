import axios from "axios";
import { getSession, signIn } from "next-auth/react";

const baseUrl = "http://10.10.20.18:8082/api/v1/";

axios.defaults.baseURL = baseUrl;

const axiosInstance = axios.create({ baseUrl });

const setHeaders = (commmonHeaders) => {
  axiosInstance.defaults.headers.common = commmonHeaders;
};

async function getLatestToken() {
  const { accessToken, error } = await getSession();
  // if (!error) store.dispatch(setToken(accessToken));
  return { accessTokem, error };
}

axiosInstance.interceptors.request.use(
  function (config) {
    document.getElementById("loader").classList.add("loadContainer");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // document.body.classList.remove("spinner");
    document.getElementById("loader").classList.remove("loadContainer");
    return response;
  },
  function (error) {
    // document.body.classList.remove("spinner");
    document.getElementById("loader").classList.remove("loadContainer");
    return Promise.reject(error);
  }
);

export { axiosInstance, setHeaders };
