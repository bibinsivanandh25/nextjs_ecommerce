import serviceUtil from "services/utils";

const getOrderReportCardData = (id) => {
  return serviceUtil
    .get(`users/reports/orders?supplierId=${id}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getOrderChartData = (id, year) => {
  return serviceUtil
    .get(`users/reports/orders/info?supplierId=${id}&year=${year}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getSummaryTableData = (id, year, pageNumber, status) => {
  return serviceUtil
    .get(
      `order-payment/reports/orders/summary?supplierId=${id}&year=${year}&pageSize=10&pageNumber=${pageNumber}&status=${status}`
    )
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getpieChartData = (id, year) => {
  return serviceUtil
    .get(
      `order-payment/order-montwise-percentage?year=${year}&supplierId=${id}`
    )
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
export {
  getOrderReportCardData,
  getOrderChartData,
  getSummaryTableData,
  getpieChartData,
};
