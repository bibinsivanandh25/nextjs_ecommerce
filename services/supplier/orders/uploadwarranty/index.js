import serviceUtil from "services/utils";

const getData = (payload) => {
  return serviceUtil
    .put(`order-payment/order/warranty`, payload)
    .then((res) => {
      const { data } = res.data;
      // console.log("This is data ,", data);
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};
const getView = (payload) => {
  return serviceUtil
    .put(`order-payment/warranty/view`, payload)
    .then((res) => {
      const { data } = res.data;
      // console.log("This is data ,", data);
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};

const uploadMedia = (
  supplierId,
  orderId,
  productVariationId,
  documentType,
  payload
) => {
  return serviceUtil
    .put(
      `products/uploadTaxInvoiceAndWarrantyCardAndPayslip?supplierId=${supplierId}&orderId=${orderId}&productVariationId=${productVariationId}&documentType=${documentType}`,
      payload,
      { headers: { "content-type": "multipart/form-data" } }
    )
    .then((res) => {
      const { data } = res.data;
      // console.log("This is data ,", data);
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};

const savewarrantyDetails = (payload) => {
  return serviceUtil
    .put(`order-payment/saveTaxWarrantyPayslip`, payload)
    .then((res) => {
      const { data } = res;
      // console.log("This is data ,", data);
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};

export { getData, getView, uploadMedia, savewarrantyDetails };
