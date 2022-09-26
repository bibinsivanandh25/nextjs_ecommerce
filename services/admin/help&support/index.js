import serviceUtil from "services/utils";

const getAllTicketsBasedOnUserType = (pageNumber, reqObj) => {
  const pageSize = 50;
  return serviceUtil
    .post(
      `help-and-support/admin/user-ticket/${pageNumber}/${pageSize}`,
      reqObj
    )
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export { getAllTicketsBasedOnUserType };
