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
    .get(`products/sub-category/drop-down-list?commissionMode=FIXED_COMMISSION`)
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

export { getSubCategories, getCategoryList, disableOrEnable };
