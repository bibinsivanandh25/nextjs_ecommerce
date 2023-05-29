import serviceUtil from "services/utils";

const customerProdFeedback = (payload) => {
  return serviceUtil
    .post("products/reviews", payload)
    .then((res) => {
      const data = res && res.data && res.data.message;

      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};
const getOrderDetails = (payload) => {
  return serviceUtil
    .post(`order-payment/order-details`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};
const returnProduct = (payload, type) => {
  return serviceUtil
    .post(`order-payment/customer-orders-action/${type}`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};
const getProductDetails = (payload) => {
  // const aaa = 113;
  return serviceUtil
    .post(`order-payment/customer-orders`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};
const getReviewData = (productVId, customerId) => {
  return serviceUtil
    .get(
      `products/get-review?productVariationId=${productVId}&customerReviewId=${customerId}`
    )
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
export {
  customerProdFeedback,
  getOrderDetails,
  returnProduct,
  getProductDetails,
  getReviewData,
};
