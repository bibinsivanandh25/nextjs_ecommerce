import serviceUtil from "services/utils";

const getSubscrptionType = (storeType) => {
  return serviceUtil
    .get(`users/admin-marketing-tool/subscription-count?type=${storeType}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getAllIndividualPricingByUserType = (user) => {
  return serviceUtil
    .get(`users/admin-marketing-tool/individual-pricing?storeType=${user}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const enableDisableMarketingTools = (payload) => {
  return serviceUtil
    .put(`/users/admin-marketing-tool/enable-disable`, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => ({ err }));
};

const updateMarketingToolPrice = (reqObj) => {
  return serviceUtil
    .put(`users/admin-marketing-tool-price`, reqObj)
    .then((res) => res)
    .catch((err) => ({ err }));
};

const getPriceChangeHistory = (pageNumber, reqObj) => {
  const pageSize = 40;
  return serviceUtil
    .post(
      `notification/admin-marketing-tool/price-change-history/${pageNumber}/${pageSize}`,
      reqObj
    )
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getToolsCampaignWithFilter = (payload) => {
  return serviceUtil
    .put(`users/admin-marketing-tool-campaign/filter`, payload)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const enableDisableToolCampaign = (payload) => {
  return serviceUtil
    .put("users/admin-marketing-tool-campaign-status", payload)
    .then((res) => res)
    .catch((err) => ({ err }));
};
export {
  getSubscrptionType,
  getAllIndividualPricingByUserType,
  updateMarketingToolPrice,
  enableDisableMarketingTools,
  getPriceChangeHistory,
  getToolsCampaignWithFilter,
  enableDisableToolCampaign,
};
