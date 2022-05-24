import serviceUtil from "./utils";

const loginCall = (payload) => {
  return serviceUtil
    .post("/authenticate", payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err?.response?.data;
      return { errRes };
    });
};

export { loginCall };
