import serviceUtil from "services/utils";

const getBannersBySupplierId = (supplierId) => {
  return serviceUtil
    .get(`users/supplier/banners?supplierId=${supplierId}`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};

const getTopProducts = (userId) => {
  return serviceUtil
    .get(
      `products/master-product-filter?status=APPROVED&pageNumber=0&pageSize=100&keyword=&supplierId=${userId}&filterStatus=ALL`
    )
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getMainCategories = () => {
  return serviceUtil
    .get(`products/main-category-enabled/0/5`)
    .then((res) => {
      const data = res && res.data?.data;
      return { data };
    })

    .catch((err) => ({ err }));
};

const getNewArrivalProducts = (filterType, supplierId) => {
  return serviceUtil
    .get(
      `/products/customer/popular-department/new-arrival?filterType=${filterType}&supplierId=${supplierId}`
    )
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getMostPopularProducts = (filterType, supplierId) => {
  return serviceUtil
    .get(
      `/products/customer/popular-department/popular-product?filterType=${filterType}&supplierId=${supplierId}`
    )
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getRecentlyViewedProducts = (customerId) => {
  return serviceUtil
    .get(`/products/recent-product/${customerId}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getArticles = () => {
  return serviceUtil
    .get(`/users/customer/article`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export {
  getBannersBySupplierId,
  getMainCategories,
  getTopProducts,
  getNewArrivalProducts,
  getMostPopularProducts,
  getRecentlyViewedProducts,
  getArticles,
};
