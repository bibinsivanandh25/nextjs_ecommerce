import serviceUtil from "services/utils";

const getAttributes = (subCategoryId) => {
  return serviceUtil
    .get(`products/sub-category/${subCategoryId}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};
const createAttributes = (payload) => {
  return serviceUtil
    .post(`products/variation/option/variation-approval`, payload)
    .then((res) => {
      const { data } = res;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};

export { getAttributes, createAttributes };
