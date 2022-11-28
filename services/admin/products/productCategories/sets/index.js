import serviceUtil from "services/utils";

const getAllSetData = (page, payload) => {
  return serviceUtil
    .post(`products/category-sets/${page}/50`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const uploadSetMedia = (payload) => {
  return serviceUtil
    .put(`products/category-media?categoryType=set`, payload, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};

const saveSet = (payload) => {
  return serviceUtil
    .post(`products/category-set`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getAllCategorys = (payload = []) => {
  return serviceUtil
    .post(`products/main-categories`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getSetDataById = (id) => {
  return serviceUtil
    .get(`products/category-set/${id}`)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const editSet = (payload) => {
  return serviceUtil
    .put(`products/category-set`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const setEnableDisable = (payload) => {
  return serviceUtil
    .put(`products/category-status`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getCategoryFilter = (payload = []) => {
  return serviceUtil
    .post(`products/main-categories`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const setDropDownData = (payload) => {
  return serviceUtil
    .post(`products/category-set/main-category`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
export {
  getAllSetData,
  uploadSetMedia,
  saveSet,
  getAllCategorys,
  getSetDataById,
  editSet,
  setEnableDisable,
  getCategoryFilter,
  setDropDownData,
};
