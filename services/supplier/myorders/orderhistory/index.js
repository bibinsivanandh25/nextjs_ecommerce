import serviceUtil from "../../../utils/index";

const getSupplierData = () => {
  return serviceUtil
    .get("/user-management/supplier-registered-details")
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Error";
      return { errRes };
    });
};

const saveSupplierData = (payload) => {
  return serviceUtil
    .post(`/user-management/admin-approval`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err?.response?.data || "Error";
      return { errRes };
    });
};
const getOrderHistory = (payload) => {
  return serviceUtil
    .post(`order-payment/supplier/orders`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};
const getOrderDetailsById = (id) => {
  return serviceUtil
    .get(`order-payment/supplier-order-details/${id}`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
export {
  getSupplierData,
  saveSupplierData,
  getOrderHistory,
  getOrderDetailsById,
};
