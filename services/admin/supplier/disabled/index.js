import serviceUtil from "services/utils";

const getDisabledSuppliers = (payload) => {
  return serviceUtil
    .post(`users/admin/disable-supplier`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};

export { getDisabledSuppliers };
