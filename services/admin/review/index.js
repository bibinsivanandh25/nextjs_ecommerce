import serviceUtil from "services/utils";

const approvedReview = (isApproved, customerReviewId) => {
  return serviceUtil
    .put(
      `products/approve-reviews?isApproved=${isApproved}&customerReviewId=${customerReviewId}`
    )
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const deleteReview = (customerReviewId) => {
  return serviceUtil
    .deleteById(`products/delete-reviews?customerReviewId=${customerReviewId}`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getAllReview = (payload) => {
  return serviceUtil
    .put(`products/customers-reviews`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const getViewData = (id) => {
  return serviceUtil
    .get(`/products/view-reviews?customerReviewId=${id}`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
export { approvedReview, deleteReview, getAllReview, getViewData };
