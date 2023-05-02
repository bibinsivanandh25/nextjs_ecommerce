import serviceUtil from "services/utils";

const getAlldeliveryManagementCard = (payload) => {
  return serviceUtil
    .post("order-payment/get-delivary-dashboard-count", payload)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getAllOrderdelivered = (payload) => {
  return serviceUtil
    .post("order-payment/delivary-management-totalorders", payload)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

export { getAlldeliveryManagementCard, getAllOrderdelivered };
