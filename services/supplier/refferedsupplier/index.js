import serviceUtil from "services/utils";

const getReferredSupplier = (id) => {
  return serviceUtil
    .get(`users/referred-supplier?supplierId=${id}`)
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
