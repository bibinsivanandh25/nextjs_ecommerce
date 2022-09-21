import serviceUtil from "services/utils";

const getProductandInventoryData = (supplierId, search, page) => {
  return serviceUtil
    .get(
      `products/supplier/product/trademark-invoice/${page}/50?supplierId=${supplierId}&keyword=${search}`
    )
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const uploadMediaForInvoice = (supplierId, payload) => {
  return serviceUtil
    .put(`products/trademark-invoice-media?supplierId=${supplierId}`, payload, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const saveInvoiceTradeMark = (payload) => {
  return serviceUtil
    .post(`products/supplier/product/trademark-invoice`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const deleteInvoiceTradeMark = (id) => {
  return serviceUtil
    .deleteById(
      `products/supplier/product/trademark-invoice?trademarkInvoiceId=${id}`
    )
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const editInvoiceTradeMark = (payload) => {
  return serviceUtil
    .put(`products/supplier/product/trademark-invoice`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export {
  getProductandInventoryData,
  uploadMediaForInvoice,
  saveInvoiceTradeMark,
  deleteInvoiceTradeMark,
  editInvoiceTradeMark,
};
