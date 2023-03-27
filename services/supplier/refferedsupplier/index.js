import serviceUtil from "services/utils";

const getReferredSupplier = (payload) => {
  return serviceUtil
    .post(`users/referred-supplier`, payload)
    .then((res) => {
      const { data } = res.data;
      // console.log("This is data ,", data);
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};

export { getReferredSupplier };
