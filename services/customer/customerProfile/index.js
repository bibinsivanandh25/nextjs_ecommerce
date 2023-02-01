import serviceUtil from "services/utils";

const getCustomerProfile = (customerId) => {
  return serviceUtil
    .get(`users/customer-profile/${customerId}`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const addProfile = (payload) => {
  return serviceUtil
    .post(`users/customer-profile`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const updateProfile = (payload) => {
  return serviceUtil
    .put(`users/customer-profile`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const deleteProfile = (profileId, userId) => {
  return serviceUtil
    .deleteById(`users/customer-profile/${userId}/${profileId}`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const switchProfile = (profileId, userId) => {
  return serviceUtil
    .get(`users/customer-profile/${userId}/${profileId}`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const uploadProfile = (userId, payload) => {
  return serviceUtil
    .put(`products/media/customer/profile?customerId=${userId}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export {
  getCustomerProfile,
  addProfile,
  updateProfile,
  uploadProfile,
  switchProfile,
  deleteProfile,
};
