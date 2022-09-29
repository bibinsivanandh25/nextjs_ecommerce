import serviceUtil from "services/utils";

const adminPriceTargetedSubscription = (payload) => {
  return serviceUtil
    .post(`users/admin-marketing-tool/tool-subscription/0/50`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const adminPriceTargetedSubscriptionDisable = (id, flag, pagename) => {
  return serviceUtil
    .put(
      `users/admin-marketing-tool/tool-subscription?purchaseId=${id}&status=${flag}&marketingTool=${pagename}`
    )
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
export {
  adminPriceTargetedSubscription,
  adminPriceTargetedSubscriptionDisable,
};
