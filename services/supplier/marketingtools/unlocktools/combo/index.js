import serviceUtil from "services/utils";

const getToolCampaignByDaysAndStoreType = (pageNumber = 0) => {
  const pageSize = 50;
  return serviceUtil
    .get(
      `users/marketing-tool/admin-marketing-tool-campaign/${pageNumber}/${pageSize}?storeType=SUPPLIER`
    )
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export { getToolCampaignByDaysAndStoreType };
