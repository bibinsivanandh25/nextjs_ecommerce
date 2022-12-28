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

const updateCartQuantity = (reqObj) => {
  return serviceUtil
    .put(`products/product/cart/count`, reqObj)
    .then((res) => {
      const { data } = res;
      return { data };
    })
    .catch((err) => ({ err }));
};

const removeProductFromCart = (productId, profileId) => {
  return serviceUtil
    .deleteById(
      `products/product/cart?productVariationId=${productId}&profileId=${profileId}`
    )
    .then((res) => {
      const { data } = res;
      return { data };
    })
    .catch((err) => ({ err }));
};
export {
  getDeliveryOptions,
  getCartProducts,
  updateCartQuantity,
  removeProductFromCart,
};
