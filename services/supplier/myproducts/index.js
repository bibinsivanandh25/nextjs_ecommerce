import axios from "axios";

const getSupplierProductCountByStatus = (userId) => {
  return axios
    .get(
      `http://10.10.31.116:8100/api/v1/products/master-product/product-variations-count?supplierId=${userId}`
    )
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export { getSupplierProductCountByStatus };
