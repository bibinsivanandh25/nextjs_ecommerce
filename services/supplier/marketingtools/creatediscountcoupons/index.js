import serviceUtil from "services/utils";

const getCreateDiscountData = (id, toolType, pageNumber) => {
  const pageSize = 50;
  return serviceUtil
    .get(
      `users/marketing-tool?userTypeId=${id}&toolType=${toolType}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const createDiscountCoupons = (payload) => {
  return serviceUtil
    .post(`users/marketing-tool`, payload)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
export { getCreateDiscountData, createDiscountCoupons };
