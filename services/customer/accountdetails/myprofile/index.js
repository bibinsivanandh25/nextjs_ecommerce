const { default: serviceUtil } = require("services/utils");

const getCustomerProfile = (customerId) => {
  return serviceUtil
    .get(`users/customer-info?customerId=${customerId}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export { getCustomerProfile };
