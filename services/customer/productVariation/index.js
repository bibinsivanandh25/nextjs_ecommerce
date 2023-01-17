import serviceUtil from "services/utils";

const getProductsUnderCategoryOrSubCategory = (reqObj) => {
  return serviceUtil
    .post(`products/customer-product`, reqObj)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export { getProductsUnderCategoryOrSubCategory };
