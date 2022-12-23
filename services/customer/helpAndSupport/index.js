import serviceUtil from "services/utils";

const getCustomerHelp = (page, payload) => {
  const pageSize = 50;
  return serviceUtil
    .post(`help-and-support/customer/ticket/${page}/${pageSize}`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export { getCustomerHelp };
