import serviceUtil from "services/utils";

const getSubscriptions = async (payload) => {
  try {
    const { data } = await serviceUtil.post(
      `users/admin-marketing-tool/tool-subscription/0/50`,
      payload
    );
    console.log("API data", data);
    return data;
  } catch (error) {
    return { error };
  }
};

const enableOrDisableSubscriptions = async (
  purchaseId,
  status,
  marketingTool
) => {
  try {
    console.log(purchaseId, " ", status, " ", marketingTool);
    const { data } = await serviceUtil.put(
      `users/admin-marketing-tool/tool-subscription?purchaseId=${purchaseId}&status=${status}&marketingTool=${marketingTool}`
    );
    console.log(data);
    return data;
  } catch (error) {
    return { error };
  }
};

const acceptRejectSingleToolSubscription = async (
  status,
  marketingToolId,
  userId
) => {
  try {
    const { data } = await serviceUtil.put(
      `users/admin-marketing-tool/approve-reject-campaign?status=${status}&marketingToolId=${marketingToolId}&userId=${userId}`
    );
    return data;
  } catch (error) {
    return { error };
  }
};

const viewAllSubsOfSingleUser = async (purchaseId) => {
  try {
    const { data } = await serviceUtil.get(
      `users/admin-marketing-tool/tool-subscription/campaign/0/50?purchaseId=${purchaseId}`
    );
    return data;
  } catch (error) {
    return { error };
  }
};

const convertFileToLink = async (formData) => {
  try {
    const { data } = await serviceUtil.put(
      `products/media/admin/marketing-tool/comment`,
      formData
    );
    return data;
  } catch (error) {
    return { error };
  }
};

const addANoteApi = async (payload) => {
  try {
    const { data } = await serviceUtil.put(
      "users/marketing-tool/comment",
      payload
    );
    return data;
  } catch (error) {
    return { error };
  }
};

export {
  getSubscriptions,
  enableOrDisableSubscriptions,
  acceptRejectSingleToolSubscription,
  viewAllSubsOfSingleUser,
  convertFileToLink,
  addANoteApi,
};
