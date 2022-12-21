import serviceUtil from "services/utils";

const getAllBankDetails = (customerId) => {
  return serviceUtil
    .get(`users/customer/get-all-bank-details/${customerId}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const AddBankDetails = (payload) => {
  return serviceUtil
    .post("/users/customer/add-bank-details ", payload)
    .then((res) => {
      const data = res;
      return data;
    })
    .catch((err) => ({ err }));
};

const EditBankDetails = (payload) => {
  return serviceUtil
    .put("/users/customer/update-bank-details", payload)
    .then((res) => {
      const data = res;
      return data;
    })
    .catch((err) => ({ err }));
};
const deleteBankDetails = (customerId, bankId) => {
  return serviceUtil
    .remove(`/users/customer/delete-bank-details/${customerId}`, bankId)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => ({ err }));
};
// const setPrimaryBank = (supplierId, bankId) => {
//   return serviceUtil
//     .get(`users/supplier-primary-bank/${supplierId}/${bankId}`)
//     .then((res) => {
//       const { data } = res;
//       return data;
//     })
//     .catch((err) => ({ err }));
// };
export {
  getAllBankDetails,
  AddBankDetails,
  EditBankDetails,
  deleteBankDetails,
  //   setPrimaryBank,
};
