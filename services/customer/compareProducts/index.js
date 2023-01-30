import serviceUtil from "services/utils";

const getCompareProductDetails = (reqObj) => {
  return serviceUtil
    .put(`/products/customer/compare/product`, reqObj)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export { getCompareProductDetails };
