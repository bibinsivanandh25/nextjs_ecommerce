import axios from "axios";

const getStoreByStoreCode = (storeCode) => {
  return axios
    .get(
      `${process.env.DOMAIN}users/customers/validate-store?storeCode=${storeCode}`
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
