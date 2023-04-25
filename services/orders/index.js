import serviceUtil from "services/utils";

const getAllOrderPaymentDetails = (payload) => {
  return serviceUtil
    .put(`order-payment/admin/orders`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const adminViewOrder = (payload) => {
  return serviceUtil
    .put(`order-payment/admin/orders/view`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const adminDeleteOrder = (payload) => {
  return serviceUtil
    .put(`order-payment/admin/orders/remove`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getOrderSummary = (pageNo, pageSize) => {
  return serviceUtil
    .put(`order-payment/admin/orders/summary/${pageNo}/${pageSize}`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
export {
  getAllOrderPaymentDetails,
  adminViewOrder,
  adminDeleteOrder,
  getOrderSummary,
};
