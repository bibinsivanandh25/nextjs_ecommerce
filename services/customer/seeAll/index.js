import serviceUtil from "services/utils";

const getAllCategory = (userId) => {
  return serviceUtil
    .get(`products/product-categories/${userId}`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};
export { getAllCategory };
