import serviceUtil from "services/utils";

const getRecentStoreList = (userId, keyword = "") => {
  return serviceUtil
    .get(`users/customers/visited-store/${userId}?keyword=${keyword}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getStoreList = (userId, keyword = "") => {
  return serviceUtil
    .get(`users/customers/store-list?customerId=${userId}&keyword=${keyword}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getAllStoresOfStoreListByStoreId = (customerStoreListId) => {
  return serviceUtil
    .get(`users/customers/store-list/store/${customerStoreListId}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getAllCustomerStores = (customerId, page = 0, keyword = "") => {
  return serviceUtil
    .get(
      `users/customers/customer-store/${page}/30?customerId=${customerId}&keyword=${keyword}`
    )
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const addStore = (payload) => {
  return serviceUtil
    .post(`users/customers/store`, payload)
    .then((res) => {
      const { data, message } = res.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};
const favouriteStore = (customerStoreId) => {
  return serviceUtil
    .put(`users/customer/favourite?customerStoreId=${customerStoreId}`)
    .then((res) => {
      const { data, message } = res.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};
const deleteStore = (customerStoreId, userId) => {
  return serviceUtil
    .deleteById(`users/customers/store/${customerStoreId}/${userId}`)
    .then((res) => {
      const { data, message } = res.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};
const switchStore = (storeCode, userId) => {
  return serviceUtil
    .put(
      `users/customer/store/default?storeCode=${storeCode}&customerId=${userId}`
    )
    .then((res) => {
      const { data, message } = res.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};
const addStoreToStoreList = (storeCode, storeListId, listName, userId) => {
  return serviceUtil
    .put(
      `users/customer/store-list?storeCode=${storeCode}&storeListId=${storeListId}&listName=${listName}&customerId=${userId}`
    )
    .then((res) => {
      const { data, message } = res.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};

const getFavoriteList = (customerId) => {
  return serviceUtil
    .get(`users/customer/favourite-store?customerId=${customerId}`)
    .then((res) => {
      const { data, message } = res.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};

export {
  getRecentStoreList,
  getStoreList,
  getAllStoresOfStoreListByStoreId,
  getAllCustomerStores,
  addStore,
  favouriteStore,
  deleteStore,
  switchStore,
  addStoreToStoreList,
  getFavoriteList,
};
