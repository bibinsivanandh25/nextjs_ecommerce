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
    .put(`/users/customer/products/review?productVariationId=${id}`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};
const getAllQandA = (payload, pageNumber) => {
  return serviceUtil
    .put(`products/customer-question-answer/${pageNumber}/10`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};

const postQuestions = (payload) => {
  return serviceUtil
    .post(`products/customer-question-answer`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};
const getProductReview = (id, pageNumber) => {
  return serviceUtil
    .put(`users/customer/review/${pageNumber}/5?productVariationId=${id}`)
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
  getAllQandA,
  postQuestions,
  getProductReview,
};
