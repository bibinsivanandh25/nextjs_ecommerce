import serviceUtil from "services/utils";

const getDashBoardData = () => {
  return serviceUtil
    .get("help-and-support/ticket/dashboard")
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getTicketCountsByIssueType = (userType) => {
  return serviceUtil
    .get(`help-and-support/ticket/dashboard/type?userFromType=${userType}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export { getDashBoardData, getTicketCountsByIssueType };
