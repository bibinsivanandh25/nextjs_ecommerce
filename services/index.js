import serviceUtil from "./utils";

const loginCall = (payload) => {
  return serviceUtil
    .post("/authenticate", payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err?.response?.data;
      return { errRes };
    });
};

const getOtp = (payload) => {
  return serviceUtil
    .post("/users/registration/forgot-password/send-otp", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err?.response?.data;
      return { errRes };
    });
};

const verifyOtp = (payload) => {
  return serviceUtil
    .post("/users/registration/verify-otp", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err?.response?.data;
      return { errRes };
    });
};
export { loginCall, getOtp, verifyOtp };
