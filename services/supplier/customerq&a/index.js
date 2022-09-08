import serviceUtil from "services/utils";

const getQuestionsAndAnswers = (supplierId, payload) => {
  return serviceUtil
    .post(`products/customer-question-answer/0/10/${supplierId}`, payload)
    .then((res) => {
      const { data } = res;
      console.log("the data -----", data);
      return data;
    })
    .catch((err) => {
      console.log("Some error", err);
      return err;
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

export { getQuestionsAndAnswers, answerTheQuestions };
