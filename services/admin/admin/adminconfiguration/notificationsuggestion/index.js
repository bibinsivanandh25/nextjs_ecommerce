import serviceUtil from "services/utils";

const saveNotificationSuggestion = (payLoad) => {
  return serviceUtil
    .post(`notification/push-notification-suggestion`, payLoad)
    .then((res) => {
      const { data, message } = res && res.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};
const updateNotificationSuggestion = (payLoad) => {
  return serviceUtil
    .put(`notification/push-notification-suggestion`, payLoad)
    .then((res) => {
      const { data, message } = res && res.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};
const getNotificationSuggestion = () => {
  return serviceUtil
    .get(`notification/push-notification-suggestion`)
    .then((res) => {
      const { data, message } = res && res.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};
const deleteNotificationSuggestion = (id) => {
  return serviceUtil
    .deleteById(`notification/push-notification-suggestion?id=${id}`)
    .then((res) => {
      const { data, message } = res && res.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};

export {
  saveNotificationSuggestion,
  updateNotificationSuggestion,
  getNotificationSuggestion,
  deleteNotificationSuggestion,
};
