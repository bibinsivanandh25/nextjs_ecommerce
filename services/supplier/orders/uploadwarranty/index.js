import serviceUtil from "services/utils";

const getData = (payload) => {
  return serviceUtil
    .put(`order-payment/order/warranty`, payload)
    .then((res) => {
      const { data } = res.data;
      // console.log("This is data ,", data);
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};
const getView = (payload) => {
  return serviceUtil
    .put(`order-payment/warranty/view`, payload)
    .then((res) => {
      const { data } = res.data;
      // console.log("This is data ,", data);
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};

export { getData, getView };
