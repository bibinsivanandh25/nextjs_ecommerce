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
export {
  getAllCustomerAddress,
  saveCustomerAddress,
  editCustomerAddress,
  deleteCustomerAddress,
  changePrimaryAddress,
  getState,
  getCountry,
  getCity,
};
