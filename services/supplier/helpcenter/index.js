import serviceUtil from "services/utils";

const getFAQData = () => {
  return serviceUtil
    .get(
      `notification/customer/help-center?helpCenterTitle=FAQ&userType=SUPPLIER`
    )
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export { getFAQData };
