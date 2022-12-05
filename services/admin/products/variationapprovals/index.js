import serviceUtil from "services/utils";

const getAllVariations = (page, reqObj) => {
  const pagesize = 50;
  return serviceUtil
    .post(
      `products/variation/option/variation-approval/${page}/${pagesize}`,
      reqObj
    )
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const acceptOrRejectVariation = (reqObj) => {
  return serviceUtil
    .put(`products/variation/option/variation-approval`, reqObj)
    .then((res) => {
      const { data, message } = res?.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};
export { getAllVariations, acceptOrRejectVariation };
