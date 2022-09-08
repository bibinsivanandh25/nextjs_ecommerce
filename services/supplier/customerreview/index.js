import serviceUtil from "services/utils";

const getAllCustomerReview = (supplierId, payload) => {
  return serviceUtil
    .post(`users/supplier/seller-review/0/10?supplierId=${supplierId}`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const reviewReply = (payload) => {
  return serviceUtil
    .put(`users/customer/reply-customer-review`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export { getAllCustomerReview, reviewReply };
