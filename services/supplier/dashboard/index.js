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
export { getAllDashboardData };
