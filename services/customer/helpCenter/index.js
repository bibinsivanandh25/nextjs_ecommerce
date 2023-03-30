import serviceUtil from "services/utils";

const getCustomerHelpCenter = (title, userType) => {
  return serviceUtil
    .get(
      `notification/customer/help-center?helpCenterTitle=${title}&userType=${userType}`
    )
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
