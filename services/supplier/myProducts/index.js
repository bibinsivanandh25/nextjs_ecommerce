import serviceUtil from "services/utils";

const getTabledata = (
  status,
  id,
  pageNumber = 0,
  keyword = "",
  filterText = "ALL"
) => {
  const pageSize = 50;
  return serviceUtil
    .get(
      `products/master-product-filter?status=${status}&pageNumber=${pageNumber}&pageSize=${pageSize}&keyword=${keyword}&supplierId=${id}&filterStatus=${filterText}`
    )
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};

const getSupplierProductCountByStatus = (userId) => {
  return serviceUtil
    .get(
      `/products/master-product/product-variations-count?supplierId=${userId}`
    )
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const markOutOfStock = (payload) => {
  return serviceUtil
    .put(`products/master-product/out-of-stock`, payload)
    .then((res) => {
      const { data, message } = res && res.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};
const getVariation = (payload) => {
  return serviceUtil
    .post(`products/master-product/product-variation`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const deleteSingleProduct = (id) => {
  return serviceUtil
    .deleteById(`products/variation/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => ({ err }));
};

const getFlags = (supplierId) => {
  return serviceUtil
    .get(`products/supplier-flag/SUPPLIER/${supplierId}`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getFlagById = (flagId, purchaseId, supplierStoreId) => {
  return serviceUtil
    .get(`products/supplier-flag/${flagId}/${purchaseId}/${supplierStoreId}`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const addProductFlag = (payload) => {
  return serviceUtil
    .post(`products/supplier-flag`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const disableProductFlag = (flagId, flag) => {
  return serviceUtil
    .put(`products/supplier-flag/${flagId}/${flag}`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

export {
  getSupplierProductCountByStatus,
  getTabledata,
  markOutOfStock,
  deleteSingleProduct,
  getVariation,
  getFlags,
  getFlagById,
  addProductFlag,
  disableProductFlag,
};
