import serviceUtil from "services/utils";

const getAllnewOrders = (payload) => {
  return serviceUtil
    .put(`order-payment/supplier/orders`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const cancelOrderFromSupplier = (payload) => {
  return serviceUtil
    .put(`order-payment/supplier/order`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const downLoadinvoice = (id) => {
  return serviceUtil
    .get(`notification/download-invoice?orderId=${id}`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};

export { getAllnewOrders, cancelOrderFromSupplier, downLoadinvoice };
