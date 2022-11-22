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
export { getMainCategories, getFilterDropDownList };
