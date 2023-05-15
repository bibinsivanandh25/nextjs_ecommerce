import serviceUtil from "services/utils";

const getAllProducts = (payload) => {
  return serviceUtil
    .put(`users/product-media`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};

export { getAllProducts };
