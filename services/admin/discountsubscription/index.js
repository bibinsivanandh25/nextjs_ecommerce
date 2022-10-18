import serviceUtil from "services/utils";

const adminDiscountSubscription = (payload, page) => {
  return serviceUtil
    .post(`users/admin-marketing-tool/tool-subscription/${page}/50`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const adminDiscountSubscriptionDisable = (id, flag, pagename) => {
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
const getViewDiscountData = (id, page) => {
  return serviceUtil
    .get(
      `users/admin-marketing-tool/tool-subscription/campaign/${page}/50?purchaseId=${id}`
    )
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const discountApproved = (status, id, userId) => {
  return serviceUtil
    .put(
      `users/admin-marketing-tool/approve-reject-campaign?status=${status}&marketingToolId=${id}&userId=${userId}`
    )
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};

const deleteDisCountSubscription = (id) => {
  return serviceUtil
    .deleteById(`users/marketing-tool?marketingToolId=${id}`)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const mediaDisCountSubscription = (payload) => {
  return serviceUtil
    .put(`products/media/admin/marketing-tool/comment`, payload, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const addNoteDisCountSubscription = (payload) => {
  return serviceUtil
    .put(`users/marketing-tool/comment`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
export {
  adminDiscountSubscription,
  adminDiscountSubscriptionDisable,
  getViewDiscountData,
  discountApproved,
  deleteDisCountSubscription,
  mediaDisCountSubscription,
  addNoteDisCountSubscription,
};
