import serviceUtil from "services/utils";

const getMarketingToolsBasedonMarketinType = (pageNumber, payload) => {
  const pageSize = 50;
  return serviceUtil
    .post(`/users/admin-marketing-tool/${pageNumber}/${pageSize}`, payload)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const approveRejectMarketingToolCampaign = (payload) => {
  return serviceUtil
    .put(`users/admin-marketing-tool/approve-reject-campaign`, payload)
    .then((res) => res)
    .catch((err) => ({ err }));
};
const getMarketingToolDetailsByToolId = (
  marketingToolId,
  marketingToolType
) => {
  return serviceUtil
    .get(
      `/users/admin-marketing-tool?marketingToolId=${marketingToolId}&marketingToolType=${marketingToolType}`
    )
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
// payload (formData) = {
//   status: "APPROVED / REJECTED",
//   marketingToolId: 4,
//   userId: "",
// };
export {
  getMarketingToolsBasedonMarketinType,
  approveRejectMarketingToolCampaign,
  getMarketingToolDetailsByToolId,
};
