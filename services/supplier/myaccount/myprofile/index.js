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

const getMainCategories = () => {
  return serviceUtil
    .get(`products/main-category/drop-down-list`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const updateSupplierProfile = (payload) => {
  return serviceUtil
    .put(`/users/supplier-profile`, payload)
    .then((res) => {
      return res;
    })
    .catch((err) => ({ err }));
};

const UpdateProfilePicture = (payload) => {
  return serviceUtil
    .put("products/supplier/supplier-profile", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      const data = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const sendOTP = (user) => {
  const formdata = new FormData();
  formdata.append("mobileNumber", user);
  formdata.append("userType", "SUPPLIER");
  return serviceUtil
    .post("users/registration/send-otp", formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => ({ err }));
};
export {
  getSupplierDetailsBySupplierId,
  updateSupplierProfile,
  getMainCategories,
  UpdateProfilePicture,
  sendOTP,
};
