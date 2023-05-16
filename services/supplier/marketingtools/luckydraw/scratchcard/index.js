import serviceUtil from "services/utils";

const getCategorys = () => {
  return serviceUtil
    .get(`products/main-category/drop-down-list`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getProducts = (supplierId, subCategoryId) => {
  return serviceUtil
    .get(
      `products/master-product/products?supplierId=${supplierId}&subCategoryId=${subCategoryId}`
    )
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const saveScratchCard = (payload) => {
  return serviceUtil
    .post(`users/marketing-tool`, payload)
    .then((res) => {
      const { data, message } = res.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};

const getAllMainCategories = (supplierId) => {
  return serviceUtil
    .get(`products/main-category/drop-down-list-supplier/${supplierId}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

export { getCategorys, getProducts, saveScratchCard, getAllMainCategories };
