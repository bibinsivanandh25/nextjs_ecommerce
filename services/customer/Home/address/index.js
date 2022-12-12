import serviceUtil from "services/utils";

const getAllCustomerAddress = (userId) => {
  return serviceUtil
    .get(`users/customer-address/${userId}`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};

const saveCustomerAddress = (userId, payload) => {
  return serviceUtil
    .post(`users/customer-address/${userId}`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};
const editCustomerAddress = (payload) => {
  return serviceUtil
    .put(`users/customer-address`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const deleteCustomerAddress = (userId, id) => {
  return serviceUtil
    .deleteAll(`users/customer-address/${userId}/${id}`)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const changePrimaryAddress = (userId, id) => {
  return serviceUtil
    .put(`users/customer-address/${userId}/${id}`)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
export {
  getAllCustomerAddress,
  saveCustomerAddress,
  editCustomerAddress,
  deleteCustomerAddress,
  changePrimaryAddress,
};
