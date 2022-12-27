const { default: serviceUtil } = require("services/utils");

const getDeliveryOptions = (productId) => {
  return serviceUtil
    .get(`products/product/delivery?productVariationId=${productId}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getCartProducts = (profileId) => {
  return serviceUtil
    .get(`/products/product/profile/cart?profileId=${profileId}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
export { getDeliveryOptions, getCartProducts };
