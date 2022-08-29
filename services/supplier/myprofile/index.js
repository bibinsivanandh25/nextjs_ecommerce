import serviceUtil from "services/utils";

const getSupplierDetailsBySupplierId = (supplierId) => {
  return serviceUtil
    .get(`/users/supplier-registration?id=${supplierId}&status=APPROVED`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

// {
//   "supplierId": "string",
//   "businessName": "string",
//   "emailId": "string",
//   "mobileNumber": "string",
//   "gstin": "string",
//   "avgStockCount": "string",
//   "mainCategories": [
//     "string"
//   ],
//   "websiteName": "string",
//   "profileImageUrl": "string",
//   "websiteLink": "string",
//   "city": "string",
//   "firstName": "string",
//   "lastName": "string",
//   "supplierReferralCode": "string",
//   "wished": true
// }
const updateSupplierProfile = (payload) => {
  return serviceUtil
    .put(`/api/v1/users/supplier-profile`, payload)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => ({ err }));
};
export { getSupplierDetailsBySupplierId, updateSupplierProfile };
