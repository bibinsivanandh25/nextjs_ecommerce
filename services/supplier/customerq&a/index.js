import serviceUtil from "services/utils";

const getQuestionsAndAnswers = (supplierId, payload, pageNumber = 0) => {
  const pageSize = 50;
  return serviceUtil
    .post(
      `products/customer-question-answer/${pageNumber}/${pageSize}/${supplierId}`,
      payload
    )
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((error) => {
      // console.log(error, "error message");
      return { error };
    });
};

const answerTheQuestions = (payload) => {
  return serviceUtil
    .put("products/customer-question-answer", payload)
    .then((res) => {
      const { data, error } = res.data;
      const someError = error;
      return { data, someError };
    })
    .catch((err) => ({ err }));
};

const deleteAnswerData = (id) => {
  return serviceUtil
    .put(`products/user-answer?customerQuestionId=${id}`)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => ({ err }));
};
export { getQuestionsAndAnswers, answerTheQuestions, deleteAnswerData };
