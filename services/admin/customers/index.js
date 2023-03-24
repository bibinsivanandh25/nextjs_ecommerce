import serviceUtil from "services/utils";

const getCustomerData = (payload) => {
  return serviceUtil
    .put(`users/admin/customer`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const viewModalApi = (customerId, status) => {
  return serviceUtil
    .get(
      `users/admin/customer/details?customerId=${customerId}&status=${status}`
    )
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const deleteCustomer = (id) => {
  return serviceUtil
    .deleteAll(`users/admin-customer/${id}`)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const enableDisableCustomer = (id, flag) => {
  return serviceUtil
    .put(`users/admin-customer/${id}/${flag}`)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};

export { getCustomerData, viewModalApi, deleteCustomer, enableDisableCustomer };
