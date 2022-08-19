import axios from "axios";

const loginCall = (payload) => {
  return axios
    .post(`${process.env.DOMAIN}authenticate`, payload)
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
  return axios
    .post(
      `${process.env.DOMAIN}users/registration/forgot-password/send-otp`,
      payload,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
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
  return axios
    .post(`${process.env.DOMAIN}users/registration/verify-otp`, payload, {
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
