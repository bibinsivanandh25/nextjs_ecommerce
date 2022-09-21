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
      `users/reports/orders/summary?supplierId=${id}&year=${year}&pageNumber=${pageNumber}&pageSize=50&status=${status}`
    )
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
export { getOrderReportCardData, getOrderChartData, getSummaryTableData };
