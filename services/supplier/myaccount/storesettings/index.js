import serviceUtil from "services/utils";

const getSupplierStoreConfiguration = (storeCode) => {
  return serviceUtil
    .get(`users/supplier/supplier-store-configuration?storeCode=${storeCode}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const supplierStoreImageConfig = (payload) => {
  return serviceUtil
    .put("/products/supplier-store-configuration", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const updateSupplierStoreConfiguration = (reqObj) => {
  return serviceUtil
    .put("users/supplier/supplier-store-configuration", reqObj)
    .then((res) => {
      return res;
    })
    .catch((err) => ({ err }));
};

const getQrPdf = (supplierId, storeCode) => {
  return serviceUtil
    .get(
      `/notification/supplierstore/qrcode?supplierId=${supplierId}&storeCode=${storeCode}`
    )
    .then((res) => {
      return res;
    })
    .catch((err) => err);
};

const getThemes = () => {
  return serviceUtil
    .get("users/supplier/store/theme")
    .then((res) => {
      return { data: res.data.data };
    })
    .catch((err) => ({ err }));
};

const applySupplierLeave = (reqObj) => {
  return serviceUtil
    .put(`users/supplier-store/leave-update`, reqObj)
    .then((res) => {
      const { data } = res;
      return { data };
    })
    .catch((err) => ({ err }));
};
export {
  getSupplierStoreConfiguration,
  supplierStoreImageConfig,
  updateSupplierStoreConfiguration,
  getThemes,
  applySupplierLeave,
  getQrPdf,
};
