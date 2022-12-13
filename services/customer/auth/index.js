import serviceUtil from "services/utils";
import toastify from "services/utils/toastUtils";

const registerCustomer = (payload) => {
  return serviceUtil
    .post(`users/customer-registration`, payload)
    .then((res) => {
      const { data, message, registeredUser } = res && res.data;
      return { data, message, registeredUser };
    })
    .catch((err) => ({
      err,
    }));
};

const login = (payload) => {
  return serviceUtil
    .post(`auth/authenticate`, payload)
    .then((res) => {
      return { data: res.data };
    })
    .catch((err) => {
      const errRes = err.response.data?.message;
      toastify(errRes, "error");
    });
};
const getCustomerById = (payload) => {
  return serviceUtil
    .get(`users/customer-info?customerId=${payload}`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};

export { registerCustomer, login, getCustomerById };
