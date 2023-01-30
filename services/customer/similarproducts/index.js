import serviceUtil from "services/utils";

const getSimilarProducts = (reqObj) => {
  return serviceUtil
    .put(`products/customer/similar/product`, reqObj)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export { getSimilarProducts };
