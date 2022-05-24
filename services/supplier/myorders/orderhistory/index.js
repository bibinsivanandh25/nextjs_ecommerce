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

export { getSupplierData, saveSupplierData };
