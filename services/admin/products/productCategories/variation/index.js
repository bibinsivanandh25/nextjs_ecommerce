import serviceUtil from "services/utils";

const getAllCategory = (payload = []) => {
  return serviceUtil
    .post(`products/main-categories`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getAllSetDataById = (id) => {
  return serviceUtil
    .get(`products/sub-category/filter/main-category?mainCategoryId=${id}`, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getAllSubCategory = (id) => {
  return serviceUtil
    .get(`products/sub-category/filter/set?setId=${id}`)
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
