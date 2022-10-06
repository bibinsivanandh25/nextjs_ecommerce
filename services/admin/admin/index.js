import serviceUtil from "services/utils";

const saveAdminManager = (payLoad) => {
  return serviceUtil
    .post(`users/admin/admin-manager`, payLoad)
    .then((res) => {
      const { data, message } = res && res.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};
const saveAdminUser = (payLoad) => {
  return serviceUtil
    .post(`users/admin/admin-users`, payLoad)
    .then((res) => {
      const { data, message } = res && res.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};
const getAdminUsers = (page, payLoad, designation) => {
  return serviceUtil
    .post(
      `users/admin/admin-users/${page}/50?designation=${designation}`,
      payLoad
    )
    .then((res) => {
      const { data, message, err } = res && res.data;
      return { data, message, err };
    })
    .catch((err) => ({ err }));
};
const disableAdmin = (status, userId) => {
  return serviceUtil
    .put(`users/admin/admin-users/${userId}?status=${status}`)
    .then((res) => {
      const { data, message, err } = res && res.data;
      return { data, message, err };
    })
    .catch((err) => ({ err }));
};
const getAdminManagerById = (userId) => {
  return serviceUtil
    .get(`users/admin/admin-manager/${userId}`)
    .then((res) => {
      const { data, message, err } = res && res.data;
      return { data, message, err };
    })
    .catch((err) => ({ err }));
};
const updatedAdminManager = (payload) => {
  return serviceUtil
    .put(`users/admin/admin-manager`, payload)
    .then((res) => {
      const { data, message, err } = res && res.data;
      return { data, message, err };
    })
    .catch((err) => ({ err }));
};
const updatedAdminUser = (payload) => {
  return serviceUtil
    .put(`users/admin/admin-users`, payload)
    .then((res) => {
      const { data, message, err } = res && res.data;
      return { data, message, err };
    })
    .catch((err) => ({ err }));
};

const deleteAdminManager = (userId) => {
  return serviceUtil
    .deleteById(`users/admin/admin-manager/${userId}`)
    .then((res) => {
      const { data, message, err } = res && res.data;
      return { data, message, err };
    })
    .catch((err) => ({ err }));
};
const deleteAdminUser = (userId) => {
  return serviceUtil
    .deleteById(`users/admin/admin-users?adminRegistrationId=${userId}`)
    .then((res) => {
      const { data, message, err } = res && res.data;
      return { data, message, err };
    })
    .catch((err) => ({ err }));
};
const getAdminUser = (userId) => {
  return serviceUtil
    .get(`users/admin/admin-users/${userId}`)
    .then((res) => {
      const { data, message, err } = res && res.data;
      return { data, message, err };
    })
    .catch((err) => ({ err }));
};

const getAdminByDesignation = (designation) => {
  return serviceUtil
    .get(`users/admin/group/admin-info?designation=${designation}`)
    .then((res) => {
      const { data, message, err } = res && res.data;
      return { data, message, err };
    })
    .catch((err) => ({ err }));
};

const getAdminGroups = () => {};
const saveAdminGroup = (payload) => {
  return serviceUtil
    .post(`users/admin/group`, payload)
    .then((res) => {
      const { data, message, err } = res && res.data;
      return { data, message, err };
    })
    .catch((err) => ({ err }));
};
const getGroupDetails = () => {};

export {
  saveAdminManager,
  saveAdminUser,
  getAdminUsers,
  disableAdmin,
  getAdminManagerById,
  updatedAdminManager,
  deleteAdminManager,
  deleteAdminUser,
  getAdminUser,
  getAdminByDesignation,
  getAdminGroups,
  saveAdminGroup,
  getGroupDetails,
  updatedAdminUser,
};
