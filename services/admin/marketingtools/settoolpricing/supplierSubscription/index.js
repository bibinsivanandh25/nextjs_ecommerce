import serviceUtil from "services/utils";

const addIndividualPricing = (payload) => {
  return serviceUtil
    .post(`/users/admin-marketing-tool`, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => ({ err }));
};

const getToolCampaignDropDownSupplier = (payload) => {
  return serviceUtil
    .post(`/users/admin-marketing-tool-campaign/tools-dropdown`, payload, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const createToolCampaignSupplier = (payload) => {
  return serviceUtil
    .post(`users/admin-marketing-tool-campaign`, payload)
    .then((res) => res)
    .catch((err) => ({ err }));
};

const updateToolCampaign = (payload) => {
  return serviceUtil
    .put(`users/admin-marketing-tool-campaign`, payload)
    .then((res) => res)
    .catch((err) => ({ err }));
};
export {
  addIndividualPricing,
  getToolCampaignDropDownSupplier,
  createToolCampaignSupplier,
  updateToolCampaign,
};
