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
export { customerProdFeedback, getOrderDetails };
