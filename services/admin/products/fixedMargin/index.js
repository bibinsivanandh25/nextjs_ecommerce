import axios from "axios";

const getAdminProductsByFilter = (payLoad) => {
  return axios
    .post(
      "http://10.10.31.116:8100/api/v1/products/admin/products/0/20",
      payLoad
    )
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const acceptOrRejectProduct = (payLoad) => {
  return axios
    .put(
      "http://10.10.31.116:8100/api/v1/products/master-product-approval",
      payLoad,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          userId: "ADM001",
        },
      }
    )
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

export { getAdminProductsByFilter, acceptOrRejectProduct };
