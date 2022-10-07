import serviceUtil from "services/utils";

const getMarketingToolsBasedonMarketinType = (pageNumber, tool) => {
  const pageSize = 50;
  return serviceUtil
    .get(`/users/admin-marketing-tool/${pageNumber}/${pageSize}/${tool}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export { getMarketingToolsBasedonMarketinType };
