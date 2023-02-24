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
const productsearch = (reqObj) => {
  return serviceUtil
    .put(`products/customer/product-search`, reqObj)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export { getProductsUnderCategoryOrSubCategory, productsearch };
