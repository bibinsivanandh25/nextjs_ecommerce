import serviceUtil from "services/utils";

const getAllCategory = (payload = []) => {
  return serviceUtil
    .get(`products/main-category/admin`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getAllSetDataById = (id) => {
  return serviceUtil
    .get(`products/category-set/all/${id}`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getAllSubCategory = (id) => {
  return serviceUtil
    .get(`products/sub-category/all/${id}`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getAllVariationData = (id) => {
  return serviceUtil
    .get(`products/sub-category/${id}`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const enableDisableVariation = (payload) => {
  return serviceUtil
    .put(`products/category/variation/status`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const deleteVariation = (payload) => {
  return serviceUtil
    .deleteAll(`products/sub-category/variation`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const enableDisableOptions = (payload) => {
  return serviceUtil
    .put(`products/category/variation/option/status`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const deleteOption = (payload) => {
  return serviceUtil
    .deleteAll(`products/sub-category/variation/option`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
export {
  getAllCategory,
  getAllSetDataById,
  getAllSubCategory,
  getAllVariationData,
  enableDisableVariation,
  deleteVariation,
  enableDisableOptions,
  deleteOption,
};
