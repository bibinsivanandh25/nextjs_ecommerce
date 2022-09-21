import serviceUtil from "services/utils";

const getFavouriteCustomers = (supplierId) => {
  return serviceUtil
    .get(`users/customers/favourite-customers/${supplierId}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getPushNotifationTitleSuggestion = () => {
  return serviceUtil
    .get(`notification/push-notification-suggestion`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getNotificationMediaURL = (payload) => {
  return serviceUtil
    .put(`/products/media/supplier/notification`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const sendScheduledNotification = (id) => {
  return serviceUtil
    .put(`notification/marketing-tool-notification/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => ({ err }));
};

const sendMarketingToolNotification = (payload) => {
  return serviceUtil
    .post(`/notification/marketing-tool-notification`, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => ({ err }));
};
const getAllNotificationWithFilters = (supplierId, pageNumber, payload) => {
  const pageSize = 21;
  return serviceUtil
    .post(
      `notification/marketing-tool-notification/${pageNumber}/${pageSize}/${supplierId}`,
      payload
    )
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const deleteNotificationById = (notificationID) => {
  return serviceUtil
    .remove(`notification/marketing-tool-notification`, notificationID)
    .then((res) => {
      return res;
    })
    .catch((err) => ({ err }));
};

const getNotificationbyId = (id) => {
  return serviceUtil
    .get(`notification/marketing-tool-notification?notificationId=${id}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export {
  getFavouriteCustomers,
  getPushNotifationTitleSuggestion,
  getNotificationMediaURL,
  sendMarketingToolNotification,
  getAllNotificationWithFilters,
  sendScheduledNotification,
  deleteNotificationById,
  getNotificationbyId,
};
