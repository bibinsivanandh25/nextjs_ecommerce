import serviceUtil from "services/utils";

const getAllIndividualPricing = () => {
  return serviceUtil
    .get(`users/admin-marketing-tool/individual-pricing?storeType=SUPPLIER`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const purchaseMarketingTool = (payload) => {
  return serviceUtil
    .post(`users/marketing-tool/purchase-marketing-tool`, payload)
    .then((res) => {
      const { data } = res;
      return { data };
    })
    .catch((err) => ({ err }));
};
export { getAllIndividualPricing, purchaseMarketingTool };
