import serviceUtil from "services/utils";

const getStoreByStoreCode = (storeCode) => {
  return serviceUtil
    .get(`users/customers/validate-store?storeCode=${storeCode}`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};
export { getStoreByStoreCode };
