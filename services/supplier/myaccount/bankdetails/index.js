import serviceUtil from "services/utils";

const getAllBankDetails = (suppplierId) => {
  return serviceUtil
    .get(`users/supplier-bank-details/${suppplierId}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const AddBankDetails = (payload) => {
  return serviceUtil
    .post("/users/supplier-bank-details", payload)
    .then((res) => {
      const data = res;
      return data;
    })
    .catch((err) => ({ err }));
};

const EditBankDetails = (payload) => {
  return serviceUtil
    .put("/users/supplier-bank-details", payload)
    .then((res) => {
      const data = res;
      return data;
    })
    .catch((err) => ({ err }));
};
const deleteBankDetails = (supplierId, bankId) => {
  return serviceUtil
    .remove(`/users/supplier-Bank/${supplierId}`, bankId)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => ({ err }));
};
const setPrimaryBank = (supplierId, bankId) => {
  return serviceUtil
    .get(`users/supplier-primary-bank/${supplierId}/${bankId}`)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => ({ err }));
};
export {
  getAllBankDetails,
  AddBankDetails,
  EditBankDetails,
  deleteBankDetails,
  setPrimaryBank,
};
