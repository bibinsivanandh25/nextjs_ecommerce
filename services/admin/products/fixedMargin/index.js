import serviceUtil from "services/utils";

const getAdminProductsByFilter = (payLoad) => {
  return serviceUtil
    .post(`products/admin/products/0/20`, payLoad)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const acceptOrRejectProduct = (payLoad) => {
  return serviceUtil
    .put(`products/master-product-approval`, payLoad, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        userId: "ADM001",
      },
    })
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

export { getAdminProductsByFilter, acceptOrRejectProduct };
