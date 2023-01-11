import serviceUtil from "services/utils";

const getAllFrequentProduct = (id) => {
  return serviceUtil
    .get(`products/fb-products/${id}`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};
const getAllProductDetails = (id, productId) => {
  return serviceUtil
    .get(
      `products/master-product/product-variations?id=${id}&status=APPROVED&profileId=${productId}`
    )
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
const getAllRating = (id) => {
  return serviceUtil
    .get(`/users/customer/products/review?productVariationId=${id}`)
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
  getAllRating,
};
