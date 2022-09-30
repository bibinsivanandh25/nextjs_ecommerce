/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import axios from "axios";
import { store } from "store";

const baseURL = `${process.env.DOMAIN}`;
// axios.defaults.baseURL = baseURL;
const { role, userId, supplierId } = store.getState()?.user;

const axiosInstance = axios.create({
  baseURL,
});

const setHeaders = (commmonHeaders) => {
  axiosInstance.defaults.headers.common = commmonHeaders;
};
// const user = useUserInfo();
axiosInstance.interceptors.request.use(async (config) => {
  config.headers = {
    "Access-Control-Allow-Origin": "*",
    ...config.headers,
    userId: ["SUPPLIER", "STAFF"].includes(role) ? supplierId : userId,
  };
  return config;
});

// async function getLatestToken() {
//   const { accessToken, error } = await getSession();
//   // if (!error) store.dispatch(setToken(accessToken));
//   return { accessTokem, error };
// }

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
