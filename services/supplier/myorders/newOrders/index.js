import serviceUtil from "services/utils";

const getAllnewOrders = (payload) => {
  return serviceUtil
    .put(`order-payment/supplier/orders`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const cancelOrderFromSupplier = (payload) => {
  return serviceUtil
    .put(`order-payment/supplier/order`, payload)
    .then((res) => {
      const { message } = res && res.data;
      return { message };
    })
    .catch((err) => {
      return { err };
    });
};
const downLoadinvoice = (id) => {
  return serviceUtil
    .get(`notification/download-invoice?orderId=${id}`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const viewNeworderDetails = (id) => {
  return serviceUtil
    .get(`order-payment/ordered-product?orderId=${id}`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const updateSerialNumber = (payload) => {
  return serviceUtil
    .put(`order-payment/supplier/orders/serial-no`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getSerialNumber = (orderId, variationId) => {
  return serviceUtil
    .put(
      `order-payment/order/serial-Nos?productVariationId=${variationId}&orderId=${orderId}`
    )
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const ConfirmOrder = (payload) => {
  return serviceUtil
    .put(`order-payment/order/action`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getPreviousInvoice = (payload) => {
  return serviceUtil
    .put(`order-payment/order/invoices`, payload)
    .then((res) => {
      const { data } = res && res?.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const viewPreviousInvoice = (id) => {
  return serviceUtil
    .put(`order-payment/invoices?invoiceId=${id}`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};

const getAllManifest = (payload) => {
  return serviceUtil
    .put(`order-payment/order/manifest`, payload)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => ({ err }));
};
const getMediaUrl = (supId, orderId, payload) => {
  return serviceUtil
    .put(
      `products/manifest-media?supplierId=${supId}&orderId=${orderId}&documentType=MANIFEST`,
      payload
    )
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const viewManifest = (id) => {
  return serviceUtil
    .get(`order-payment/viewManifest?manifestId=${id}`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const uploadMenifestData = (payload) => {
  return serviceUtil
    .post(`order-payment/uploadManifest`, payload)
    .then((res) => {
      const uploadData = res && res.data;
      return { uploadData };
    })
    .catch((error) => {
      return { error };
    });
};
export {
  getAllnewOrders,
  cancelOrderFromSupplier,
  downLoadinvoice,
  viewNeworderDetails,
  updateSerialNumber,
  getSerialNumber,
  ConfirmOrder,
  getPreviousInvoice,
  viewPreviousInvoice,
  getAllManifest,
  getMediaUrl,
  viewManifest,
  uploadMenifestData,
};
