import serviceUtil from "services/utils";

const getUserMarketingTool = (id, toolType, pageNumber) => {
  const pageSize = 50;
  return serviceUtil
    .get(
      `users/marketing-tool?userTypeId=${id}&toolType=${toolType}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};

const getAllMainCategories = () => {
  return serviceUtil
    .get("products/main-category/drop-down-list")
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getSetbyCategories = (payload) => {
  return serviceUtil
    .get(`products/category-set/drop-down-list?mainCategoryId=${payload}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};
const getSubCategorybySets = (payload) => {
  return serviceUtil
    .get(`products/sub-category/drop-down-list?setId=${payload}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};

const getProductsBySubCategoryId = (supplierId, subCategoryId) => {
  return serviceUtil
    .get(
      `products/master-product/products?supplierId=${supplierId}&subCategoryId=${subCategoryId}`
    )
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const deleteMarketingToolData = (id) => {
  return serviceUtil
    .deleteById(`users/marketing-tool?marketingToolId=${id}`)
    .then((res) => {
      const { data } = res;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getProductsForShareproduct = (payload) => {
  return serviceUtil
    .post("products/master-product/products/price", payload)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getThemes = () => {
  return serviceUtil
    .get("users/marketing-tool-themes")
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const deleteMarketingTool = (id) => {
  return serviceUtil
    .deleteById(`users/marketing-tool?marketingToolId=${id}`)
    .then((res) => {
      const { data, message } = res.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};

export {
  getUserMarketingTool,
  getAllMainCategories,
  getSetbyCategories,
  getSubCategorybySets,
  getProductsBySubCategoryId,
  deleteMarketingToolData,
  getProductsForShareproduct,
  getThemes,
  deleteMarketingTool,
};
