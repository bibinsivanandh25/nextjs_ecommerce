import axios from "axios";

const getStoreByStoreCode = (storeCode) => {
  return axios
    .get(
      `http://10.10.31.116:8765/api/v1/users/customers/validate-store?storeCode=${storeCode}`
    )
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};
export { getStoreByStoreCode };
