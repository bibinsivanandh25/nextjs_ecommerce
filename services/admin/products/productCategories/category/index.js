const { default: serviceUtil } = require("services/utils");

const getMainCategories = (pageNumber, reqObj) => {
  const pageSize = 40;
  return serviceUtil
    .post(`products/main-category/${pageNumber}/${pageSize}`, reqObj)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getFilterDropDownList = () => {
  return serviceUtil
    .get(`products/main-category/filter-drop-down-list`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const addMainCategory = (reqObj) => {
  return serviceUtil
    .post(`products/main-category`, reqObj)
    .then((res) => {
      const data = res?.data;
      return data;
    })
    .catch((err) => ({ err }));
};
const UpdateMainCategory = (reqObj) => {
  return serviceUtil
    .put(`products/main-category`, reqObj)
    .then((res) => {
      const data = res?.data;
      return data;
    })
    .catch((err) => ({ err }));
};

const getCategoryMediaUrl = (file) => {
  return serviceUtil
    .put(`products/category-media?categoryType=MAIN`, file, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      const data = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const enableOrDisableMainCategory = (reqObj) => {
  return serviceUtil
    .put(`products/category-status`, reqObj)
    .then((res) => {
      const data = res;
      return data;
    })
    .catch((err) => ({ err }));
};

const getMainCategoryDetailsByCategoryId = (categoryId) => {
  return serviceUtil
    .get(`products/main-category/${categoryId}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

export {
  getMainCategories,
  getFilterDropDownList,
  getMainCategoryDetailsByCategoryId,
  addMainCategory,
  UpdateMainCategory,
  getCategoryMediaUrl,
  enableOrDisableMainCategory,
};
