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
const getCountry = () => {
  return serviceUtil
    .get(`help-and-support/allCountries`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getState = (country) => {
  return serviceUtil
    .get(`help-and-support/allStates/${country}`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getCity = (country, state) => {
  return serviceUtil
    .get(`help-and-support/allCities?country=${country}&state=${state}`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
export { supplierRegister, getCountry, getState, getCity };
