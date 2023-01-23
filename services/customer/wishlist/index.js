const { default: serviceUtil } = require("services/utils");

const getAllWishListsByProfileId = (customerId, profileId) => {
  return serviceUtil
    .get(`/users/customer/wishlist/${customerId}/${profileId}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const addNewWishList = (reqObj) => {
  return serviceUtil
    .post(`/users/customer/wishlist`, reqObj)
    .then((res) => {
      const { data, message } = res?.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};
const updateWishListName = (profileId, wishListId, reqObj) => {
  return serviceUtil
    .put(`users/customer/wishlist/${profileId}/${wishListId}`, reqObj, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      const { data, message } = res?.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};
const deleteWishListName = (profileId, wishListId) => {
  return serviceUtil
    .deleteById(`users/customer/wishlist/${profileId}/${wishListId}`)
    .then((res) => {
      const { data } = res;
      return { data };
    })
    .catch((err) => ({ err }));
};

const fetchProductsFromWishListId = (reqObj) => {
  return serviceUtil
    .put(`users/customer/wishlist/products/0/50`, reqObj)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const addProductToWishList = (reqObj) => {
  return serviceUtil
    .post(`/users/customer/wishlist/products`, reqObj)
    .then((res) => {
      return res;
    })
    .catch((err) => ({ err }));
};
const removeProductFromWishList = (wishListId, productId) => {
  return serviceUtil
    .put(
      `/users/customer/wishlist?wishlistId=${wishListId}&variationId=${productId}`
    )
    .then((res) => {
      return res;
    })
    .catch((err) => ({ err }));
};

const productDetailsView = (id) => {
  return serviceUtil
    .get(`/products/customer/product-view/${id}`)
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

export {
  getAllWishListsByProfileId,
  addNewWishList,
  updateWishListName,
  deleteWishListName,
  fetchProductsFromWishListId,
  addProductToWishList,
  removeProductFromWishList,
  productDetailsView,
};
