import serviceUtil from "services/utils";

const getPaymentReportCardData = (id) => {
  return serviceUtil
    .get(`order-payment/paymet-details?supplierId=${id}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getMonthWiseBarChart = (id, year) => {
  return serviceUtil
    .get(`order-payment/paymet-montwise-details?year=${year}&supplierId=${id}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getMonthWiseChart = (id, year) => {
  return serviceUtil
    .get(
      `order-payment/paymet-montwise-percentage?year=${year}&supplierId=${id}`
    )
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getPaymentMonthDetails = (id, year) => {
  return serviceUtil
    .get(`order-payment/paymet-monthwise-sale?year=${year}&supplierId=${id}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getSummaryData = (payload) => {
  return serviceUtil
    .post(`order-payment/paymet-summary`, payload)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
export {
  getPaymentReportCardData,
  getMonthWiseBarChart,
  getMonthWiseChart,
  getPaymentMonthDetails,
  getSummaryData,
};
