import serviceUtil from "services/utils";

const dashboardCount = () => {
  return serviceUtil
    .get(`order-payment/get-delivary-dashboard-count`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
// const getAlldeliveryManagementCard = (payload) => {
//   return serviceUtil
//     .post("order-payment/get-delivary-dashboard-count", payload)
//     .then((res) => {
//       const { data } = res?.data;
//       return { data };
//     })
//     .catch((err) => ({ err }));
// };
const getAllOrderdelivered = (payload) => {
  return serviceUtil
    .post("order-payment/delivary-management-totalorders", payload)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getPaidAmount = (payload) => {
  return serviceUtil
    .post(`order-payment/delivary-management-amount-paid`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getForwardOrder = (payload) => {
  return serviceUtil
    .post(`order-payment/delivary-managementforwordorder`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getReturnedOrder = (payload) => {
  return serviceUtil
    .post(`order-payment/delivary-management-return-order`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getDeliveryStatus = (payload) => {
  return serviceUtil
    .put(`order-payment/admin/delivery-status`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
export {
  getAllOrderdelivered,
  dashboardCount,
  getPaidAmount,
  getForwardOrder,
  getReturnedOrder,
  getDeliveryStatus,
};
