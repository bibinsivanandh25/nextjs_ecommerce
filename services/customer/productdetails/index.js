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
const getAllProductDetails = (payload) => {
  return serviceUtil
    .put(`products/master-product/product-variations`, payload)
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
      const data = res && res.data;
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};
const getProductReview = (id, pageNumber) => {
  return serviceUtil
    .put(`users/customer/review/${pageNumber}/10?productVariationId=${id}`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};
const mainProductAddToCart = (payload) => {
  return serviceUtil
    .post(`products/product/user-cart`, payload)
    .then((res) => {
      const { data } = res;
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};
const getAddToCartData = (payload) => {
  return serviceUtil
    .put(`products/cart/group/product`, payload)
    .then((res) => {
      const { data } = res;
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};
const similarProductsData = async (payload) => {
  return serviceUtil
    .put(`products/customer/similar/product`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};

const saveAsRecentProduct = (payload) => {
  return serviceUtil
    .post(`products/recent-product`, payload)
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
  mainProductAddToCart,
  getAddToCartData,
  similarProductsData,
  saveAsRecentProduct,
};
