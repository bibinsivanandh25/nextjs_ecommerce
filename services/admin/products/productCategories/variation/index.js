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

export {
  getAllCategory,
  getAllSetDataById,
  getAllSubCategory,
  getAllVariationData,
};
