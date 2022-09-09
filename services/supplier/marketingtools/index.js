import serviceUtil from "services/utils";

const getUserMarketingTool = () => {
  return serviceUtil.get(
    `users/marketing-tool?userTypeId=SP0922000002&toolType=DISCOUNT_COUPON&pageNumber=0&pageSize=5`
  );
};
export { getUserMarketingTool };
