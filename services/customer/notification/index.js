import serviceUtil from "services/utils";

const getCustomerquary = (payload) => {
  return serviceUtil
    .post("/products/customer-question-answers", payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};
const getProductquary = (payload) => {
  return serviceUtil
    .post(
      `/products/customer-question-answers/${payload.pageNumber}/${payload.pageSize}/${payload.createdBy}`,
      payload
    )
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};
const deleteQuary = (id) => {
  return serviceUtil
    .deleteById(`/products/customer-question-answer/${id}`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};
const editQuestion = (payload) => {
  return serviceUtil
    .put(
      `/products/customer-update-query/${payload.userid}/${payload.questionid}?question=${payload.question}`
    )
    .then((res) => {
      const data = res && res.data && res.data.message;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};
const viewQuery = (payload) => {
  return serviceUtil
    .get(
      `/products/customer-view-query/${payload.userid}/${payload.questionId}`
    )
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};
const viewProductQuery = (questionId) => {
  return serviceUtil
    .get(`/products/customer-question-answer/${questionId}`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};
const replyProductQuery = (payload) => {
  return serviceUtil
    .put(
      `/products/customer-replay-query/${payload.questionId}/${payload.userName}?answer=${payload.answer}`
    )
    .then((res) => {
      const data = res && res.data && res.data.message;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};
export {
  getCustomerquary,
  getProductquary,
  deleteQuary,
  editQuestion,
  viewQuery,
  viewProductQuery,
  replyProductQuery,
};
