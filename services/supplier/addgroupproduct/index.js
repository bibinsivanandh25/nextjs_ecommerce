import serviceUtil from "services/utils";

const getParentProductList = (payload) => {
  return serviceUtil
    .put("products/grouped-product/dropdown/parent", payload)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getChildProductList = (payload) => {
  return serviceUtil
    .put("products/grouped-product/dropdown/child", payload)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const addGroupedProducts = (payload) => {
  return serviceUtil
    .post("products/grouped-product", payload)
    .then((res) => {
      const { data } = res;
      return { data };
    })
    .catch((err) => ({ err }));
};
export { getParentProductList, getChildProductList, addGroupedProducts };
