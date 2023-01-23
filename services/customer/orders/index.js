import serviceUtil from "services/utils";

const customerProdFeedback = (payload) => {
  return serviceUtil
    .post("products/customer-review", payload)
    .then((res) => {
      console.log(res, "response");
      const data = res && res.data && res.data.message;

      return { data };
    })
    .catch((err) => {
      console.log(err, "error status");
      const errRes = err;
      return { errRes };
    });
};
export { customerProdFeedback };
