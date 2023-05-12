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
const updateProfile = (payload) => {
  return serviceUtil
    .put(`users/customer/profile`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};
const getOtp = (payload) => {
  return serviceUtil
    .post(
      `users/registration/send-otp?mobileNumber=${payload.mobileNumber}&userType=CUSTOMER`
    )
    .then((res) => {
      const data = res && res.data && res.data.message;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.message;
      return { errRes };
    });
};
const varifyPhoneOtp = (payload) => {
  return serviceUtil
    .post(`users/registration/verify-otp`, payload)
    .then((res) => {
      const data = res && res.data && res.data.message;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};
const sendOtpEmailOrPhone = (payload) => {
  return serviceUtil
    .post(`users/customer-update/send-otp`, payload)
    .then((res) => {
      const data = res && res.data && res.data.message;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};
const UpdateProfilePicture = (file, userId) => {
  return serviceUtil
    .put(`products/media/customer/profile?customerId=${userId}`, file, {
      headers: { "content-type": "application/json" },
    })
    .then((res) => {
      const datas = res?.data;
      return { datas };
    })
    .catch((err) => ({ err }));
};
export {
  getCustomerProfile,
  updateProfile,
  getOtp,
  varifyPhoneOtp,
  sendOtpEmailOrPhone,
  UpdateProfilePicture,
};
