const { default: serviceUtil } = require("services/utils");

const getActiveMarketingToolNames = (supplierId) => {
  return serviceUtil
    .get(`/users/coupon-applicable/${supplierId}/SUPPLIER`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getProductsByMarketingTool = (reqObj) => {
  return serviceUtil
    .put(`users/customer/products`, reqObj)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getScratchCardMarketingTool = (purchaseId) => {
  return serviceUtil
    .get(`users/customer-products?purchaseId=${purchaseId}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export {
  getActiveMarketingToolNames,
  getProductsByMarketingTool,
  getScratchCardMarketingTool,
};
