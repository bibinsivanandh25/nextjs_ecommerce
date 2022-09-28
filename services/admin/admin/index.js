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

export { saveAdminManager, saveAdminUser };
