import serviceUtil from "services/utils";

const getStore = (payload) => {
  return serviceUtil
    .post(`users/customer-supplier/0/10`, payload)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

export { getStore };
