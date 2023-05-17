import serviceUtil from "services/utils";

const getPenaltyData = (supplierId) => {
  return serviceUtil
    .get(`order-payment/reports/penalty?supplierId=${supplierId}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getPerformanceData = (supplierId) => {
  return serviceUtil
    .get(`order-payment/reports/sales?supplierId=${supplierId}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export { getPenaltyData, getPerformanceData };
