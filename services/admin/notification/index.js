import serviceUtil from "services/utils";

const getSupplierDropdown = (payload) => {
  return serviceUtil
    .put(`notification/notification-dropdown`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const createNotificationApiCall = (payload) => {
  return serviceUtil
    .post(`notification/notification`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getAllNotification = (payload) => {
  return serviceUtil
    .put(`notification/get-all-notifications`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const viewNotificationApiCall = (id) => {
  return serviceUtil
    .get(`notification/notification-view?notificationDetailsId=${id}`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const deleteNotificationApiCall = (id) => {
  return serviceUtil
    .deleteById(`notification/notification-delete?notificationDetailsId=${id}`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getNotificationById = (id) => {
  return serviceUtil
    .get(`notification/get-notification?notificationDetailsId=${id}`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const updateNotification = (payload) => {
  return serviceUtil
    .put(`notification/notification-update`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
export {
  getSupplierDropdown,
  createNotificationApiCall,
  getAllNotification,
  viewNotificationApiCall,
  deleteNotificationApiCall,
  getNotificationById,
  updateNotification,
};
