import serviceUtil from "services/utils";

const getAllDashboardData = (id) => {
  return serviceUtil
    .get(`users/reports/revenue-sales?supplierId=${id}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getReferralChartData = (id, year) => {
  return serviceUtil
    .get(`users/reports/revenue-sales/referrals?supplierId=${id}&year=${year}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getCustomerChartData = (id, year) => {
  return serviceUtil
    .get(`users/reports/revenue-sales/customers?storeCode=${id}&year=${year}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getMonthWiseSale = (id, year) => {
  return serviceUtil
    .get(`users/reports/revenue-sales/sales?supplierId=${id}&year=${year}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
export {
  getAllDashboardData,
  getReferralChartData,
  getCustomerChartData,
  getMonthWiseSale,
};
