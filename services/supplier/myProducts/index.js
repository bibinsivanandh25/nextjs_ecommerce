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

export { getSupplierProductCountByStatus, getTabledata, markOutOfStock };
