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

const addNewAddress = (payload, supplierId) => {
  return serviceUtil
    .post(`/users/supplier-address`, payload, {
      headers: {
        userId: supplierId,
      },
    })
    .then((res) => {
      return res;
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
const validPincode = (payload) => {
  return serviceUtil
    .post(`order-payment/validatePincode`, payload)
    .then((res) => {
      const status = res && res.data;
      return { status };
    })
    .catch((error) => {
      return { error };
    });
};
export {
  getAllAddressofSupplier,
  changePrimaryAddress,
  addNewAddress,
  updateAddress,
  deleteAddress,
  validPincode,
};
