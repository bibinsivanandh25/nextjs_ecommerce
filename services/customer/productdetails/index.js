import serviceUtil from "services/utils";

const getAllFrequentProduct = (id) => {
  return serviceUtil
    .get(`products/grouped-product/${id}`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};
const getAllProductDetails = (id, status) => {
  return serviceUtil
    .get(`products/master-product/product-variations?id=${id}&status=${status}`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};

const getAllMinumCart = (id) => {
  return serviceUtil
    .get(`users/supplier/supplier-store-configuration?storeCode=${id}`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};
const getAllCouponsData = (id) => {
  return serviceUtil
    .get(`users/customer/store-coupon?supplierId=${id}`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};
export {
  getAllFrequentProduct,
  getAllProductDetails,
  getAllMinumCart,
  getAllCouponsData,
};
