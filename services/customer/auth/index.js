import serviceUtil from "services/utils";
import toastify from "services/utils/toastUtils";

const registerCustomer = (payload) => {
  return serviceUtil
    .post(`users/customer-registration`, payload)
    .then((res) => {
      const { data, message } = res && res.data;
      return { data, message };
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

export { registerCustomer, login };
