import serviceUtil from "services/utils";

const getAdminProductsByFilter = (payLoad, pageNumber = 0) => {
  const pageSize = 100;
  return serviceUtil
    .post(`products/admin/products/${pageNumber}/${pageSize}`, payLoad)
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
      const { data, message } = res && res.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};
const raiseQuery = (payLoad) => {
  return serviceUtil
    .post(`help-and-support/product-ticket`, payLoad)
    .then((res) => {
      const { data, message } = res && res.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};

const disableActiveProduct = (productID, disable) => {
  return serviceUtil
    .put(`products/product-variation/${productID}/${disable}`)
    .then((res) => {
      const data = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

export {
  getAdminProductsByFilter,
  acceptOrRejectProduct,
  raiseQuery,
  disableActiveProduct,
};
