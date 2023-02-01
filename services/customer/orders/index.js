import serviceUtil from "services/utils";

const customerProdFeedback = (payload) => {
  return serviceUtil
    .post("products/customer-review", payload)
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
const getProductDetails = (addId, orderId) => {
  // const aaa = 113;
  return serviceUtil
    .get(
      `order-payment/customer-orders?shippingAddressId=${addId}&orderId=${orderId}`
    )
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};
export {
  customerProdFeedback,
  getOrderDetails,
  returnProduct,
  getProductDetails,
};
