import serviceUtil from "services/utils";

const getAllAddressofSupplier = (supplierId) => {
  return serviceUtil
    .get(`users/supplier-addresses/${supplierId}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const changePrimaryAddress = (supplierId, addressId) => {
  return serviceUtil
    .get(`/users/supplier-primary-address/${supplierId}/${addressId}`)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => ({ err }));
};

const addNewAddress = (payload) => {
  return serviceUtil
    .post(`/users/supplier-address`, payload)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => ({ err }));
};
const updateAddress = (payload) => {
  return serviceUtil
    .put(`/users/supplier-address`, payload)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => ({ err }));
};
const deleteAddress = (supplierId, addressId) => {
  return serviceUtil
    .remove(`/users/supplier-address/${supplierId}`, addressId)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => ({ err }));
};
export {
  getAllAddressofSupplier,
  changePrimaryAddress,
  addNewAddress,
  updateAddress,
  deleteAddress,
};
