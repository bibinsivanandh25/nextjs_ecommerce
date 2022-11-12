const { default: serviceUtil } = require("services/utils");

const getMainCategories = (commissionType) => {
  return serviceUtil
    .get(`products/categories?commissionType=${commissionType}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getSubCategories = (commissionType, payload) => {
  return serviceUtil
    .post(`/products/sub-categories?commissionType=${commissionType}`, payload)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getBrands = (payload) => {
  return serviceUtil
    .post(`products/brands`, payload)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getProductTitles = (payload) => {
  return serviceUtil
    .post(`products/product-titles`, payload)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const deleteProducts = (id) => {
  return serviceUtil
    .remove(`products/variation`, id)
    .then((res) => res)
    .catch((err) => ({ err }));
};

const getAllProductsCount = (commissionType) => {
  return serviceUtil
    .get(`products/admin/products/count?commissionType=${commissionType}`)
    .then((res) => {
      const data = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

export {
  getMainCategories,
  getSubCategories,
  getBrands,
  getProductTitles,
  deleteProducts,
  getAllProductsCount,
};
