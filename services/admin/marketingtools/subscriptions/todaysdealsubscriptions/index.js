import serviceUtil from "services/utils";

const getTodaysDealSubsscriptions = async (payload) => {
  try {
    const { data } = await serviceUtil.post(
      "users/admin-marketing-tool/tool-subscription/0/50",
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

const addANote = () => {};

export {
  getTodaysDealSubsscriptions,
  enableOrDisableSubscriptions,
  acceptRejectSingleToolSubscription,
};
