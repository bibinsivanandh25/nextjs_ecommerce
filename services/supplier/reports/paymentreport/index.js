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
export { getPaymentReportCardData };
