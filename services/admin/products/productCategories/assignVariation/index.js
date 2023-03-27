import serviceUtil from "services/utils";

const getCategory = () => {
  return serviceUtil
    .get(`products/main-category/drop-down-list`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getAllCategory = () => {
  return serviceUtil
    .get(`products/main-category/drop-down-list`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getSubCategory = (id) => {
  return serviceUtil
    .get(`products/sub-category/filter/set?setId=${id}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getStandard = () => {
  return serviceUtil
    .get(`products/standard-variation`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getOptions = (id) => {
  return serviceUtil
    .get(`products/sub-category/option-list/${id}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const addVariationToSubCategory = (payload) => {
  return serviceUtil
    .put(`products/sub-category/variation`, payload)
    .then((res) => {
      const { data } = res;
      return { data };
    })
    .catch((err) => ({ err }));
};

export {
  getCategory,
  getSubCategory,
  getStandard,
  getOptions,
  addVariationToSubCategory,
  getAllCategory,
};
