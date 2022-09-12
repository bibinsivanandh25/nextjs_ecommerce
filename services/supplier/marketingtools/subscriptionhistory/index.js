import serviceUtil from "services/utils";

const getSubscriptionHistoryBasedonSupplier = (pageNumber, payload) => {
  const pageSize = 50;
  return serviceUtil
    .post(
      `users/marketing-tool/subscription-history/${pageNumber}/${pageSize}`,
      payload
    )
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export { getSubscriptionHistoryBasedonSupplier };
