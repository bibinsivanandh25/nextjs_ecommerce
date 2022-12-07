import serviceUtil from "services/utils";

const getRecentStoreList = (userId) => {
  return serviceUtil
    .get(`users/customers/visited-store/${userId}`)
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
const getAllCustomerStores = (customerId, page = 1, keyword = "") => {
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
      console.log(res);
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
};
