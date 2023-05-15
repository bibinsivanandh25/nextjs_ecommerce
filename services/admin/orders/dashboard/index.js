import serviceUtil from "services/utils";

const getAllTotalOrders = (payload) => {
  return serviceUtil
    .post(`order-payment/total-orders`, payload)
    .then((res) => {
      const { data } = res && res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const totalOrderBarChart = (payload) => {
  return serviceUtil
    .post(`order-payment/total-products-category`, payload)
    .then((res) => {
      const { data } = res && res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const totalReturnableBarChart = (payload) => {
  return serviceUtil
    .post(`order-payment/returnable-products`, payload)
    .then((res) => {
      const { data } = res && res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const totalReturnBarChart = (payload) => {
  return serviceUtil
    .post(`order-payment/returned-products`, payload)
    .then((res) => {
      const { data } = res && res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const totalrefundBarChart = (payload) => {
  return serviceUtil
    .post(`order-payment/refund-Products`, payload)
    .then((res) => {
      const { data } = res && res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const returnTableData = (payload) => {
  return serviceUtil
    .post(`order-payment/category-returns-happining`, payload)
    .then((res) => {
      const { data } = res && res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const supplierTableData = (payload) => {
  return serviceUtil
    .post(`order-payment/supplier-causing`, payload)
    .then((res) => {
      const { data } = res && res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const customerTableData = (payload) => {
  return serviceUtil
    .post(`order-payment/customer-returns`, payload)
    .then((res) => {
      const { data } = res && res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export {
  getAllTotalOrders,
  totalOrderBarChart,
  totalReturnableBarChart,
  totalReturnBarChart,
  totalrefundBarChart,
  returnTableData,
  supplierTableData,
  customerTableData,
};
