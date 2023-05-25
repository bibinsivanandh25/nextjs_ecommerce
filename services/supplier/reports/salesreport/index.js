import serviceUtil from "services/utils";

const getSalesCardData = (id) => {
  return serviceUtil
    .get(`notification/sales-details/${id}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};

const getSalesBarChartData = (year, id) => {
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

const getSalesPieChartData = (year, id) => {
  return serviceUtil
    .get(`notification/salesDetailsInPercentage?supplierId=${id}&year=${year}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};

const getSalesMonthWise = (year, id) => {
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

const getSalesMonthWiseSummary = (payload) => {
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

const getSalesCurrentDayWise = (id) => {
  return serviceUtil
    .get(`notification/currentDaySales?supplierId=${id}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};

const getSalesCurrentDayWiseSummary = (payload) => {
  return serviceUtil
    .post(`order-payment/currentDaySalesSummary`, payload)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};

export {
  getSalesCardData,
  getSalesBarChartData,
  getSalesPieChartData,
  getSalesMonthWise,
  getSalesMonthWiseSummary,
  getSalesCurrentDayWise,
  getSalesCurrentDayWiseSummary,
};
