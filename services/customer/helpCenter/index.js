import serviceUtil from "services/utils";

const getCustomerHelpCenter = (title) => {
  return serviceUtil
    .get(`notification/customer/help-center?helpCenterTitle=${title}`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};
export { getCustomerHelpCenter };
