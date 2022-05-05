const { default: serviceUtil } = require("services/utils");

const supplierRegister = (payload) => {
  return serviceUtil
    .post("user-management/supplier-register", payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

export { supplierRegister };
