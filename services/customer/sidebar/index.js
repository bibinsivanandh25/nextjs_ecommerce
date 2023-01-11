import serviceUtil from "services/utils";

const getAllMainCategories = (supplierId) => {
  return serviceUtil
    .get(`products/customer-categories?supplierId=${supplierId}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getAllSetandSubCategoriesByMainCategory = (mainCategoryId) => {
  return serviceUtil
    .get(`products/main-category/set/sub-category/${mainCategoryId}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export { getAllMainCategories, getAllSetandSubCategoriesByMainCategory };
