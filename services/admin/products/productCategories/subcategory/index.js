const { default: serviceUtil } = require("services/utils");

const getSubCategories = (pageNumber, payload) => {
  const pageSize = 40;
  return serviceUtil
    .post(`products/sub-categories/${pageNumber}/${pageSize}`, payload)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getCategoryList = () => {
  return serviceUtil
    .get(
      `products/sub-category/filter/commission-mode?commissionMode=FIXED_COMMISSION`
    )
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getSetsList = (mainCategoryId) => {
  return serviceUtil
    .get(
      `products/sub-category/filter/main-category?mainCategoryId=${mainCategoryId}`
    )
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getPriceRangeList = (mainCategoryId) => {
  return serviceUtil
    .get(`products/main-category/${mainCategoryId}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const createSubCategory = (payload) => {
  return serviceUtil
    .post(`products/sub-category`, payload)
    .then((res) => {
      const { data, message } = res.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};
const updateSubCategory = (payload) => {
  return serviceUtil
    .put(`products/sub-category`, payload)
    .then((res) => {
      const { data, message } = res.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};
const uploadSubCategoryImage = (payload) => {
  return serviceUtil
    .put(`products/category-media?categoryType=subcategory`, payload)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getCategoryById = (subCategoryId) => {
  return serviceUtil
    .get(`products/sub-category/${subCategoryId}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const disableOrEnable = (payload) => {
  return serviceUtil
    .put(`products/category-status`, payload)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

export {
  getSubCategories,
  getCategoryList,
  disableOrEnable,
  getSetsList,
  getPriceRangeList,
  uploadSubCategoryImage,
  createSubCategory,
  updateSubCategory,
  getCategoryById,
};
