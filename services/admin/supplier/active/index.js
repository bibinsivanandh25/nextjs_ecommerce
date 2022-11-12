import serviceUtil from "services/utils";

const getActiveSuppliers = (payload) => {
  return serviceUtil
    .post(`users/admin/active-supplier`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getAllActiveViewData = (supplierId) => {
  return serviceUtil
    .get(`users/admin/supplier/view?supplierId=${supplierId}&status=APPROVED`)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};

export { getActiveSuppliers, getAllActiveViewData };
