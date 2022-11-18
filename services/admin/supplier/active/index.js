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
const getAllActiveViewData = (supplierId, type) => {
  return serviceUtil
    .get(`users/admin/supplier/view?supplierId=${supplierId}&status=${type}`)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};

const enableDisableSupplier = (payload) => {
  return serviceUtil
    .put(`users/admin/supplier/status`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getProductsBySupplierId = (supplierId, page) => {
  return serviceUtil
    .get(`products/admin/supplier/product/${page}/50/${supplierId}`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

export {
  getActiveSuppliers,
  getAllActiveViewData,
  enableDisableSupplier,
  getProductsBySupplierId,
};
