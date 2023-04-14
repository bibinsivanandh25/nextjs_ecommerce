import serviceUtil from "services/utils";

const getPaymentReportCardData = () => {
  return serviceUtil
    .get(`order-payment/paymet-details`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getMonthWiseBarChart = (year) => {
  return serviceUtil
    .get(`order-payment/paymet-montwise-details?year=${year}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getMonthWiseChart = (year) => {
  return serviceUtil
    .get(`order-payment/paymet-montwise-percentage?year=${year}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getPaymentMonthDetails = (year) => {
  return serviceUtil
    .get(`order-payment/paymet-monthwise-sale?year=${year}`)
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
