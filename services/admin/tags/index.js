import serviceUtil from "services/utils";

const getAdminTags = (page) => {
  return serviceUtil
    .get(`products/product-tags/${page}/50`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const saveAdminTags = (payload) => {
  return serviceUtil
    .post(`products/product-tag`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const deleteAdminTags = (id) => {
  return serviceUtil
    .deleteById(`products/produt-tag/${id}`)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const approveAdminTags = (id, ststus) => {
  return serviceUtil
    .put(`products/product-tag/status/${id}/${ststus}`)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
export { getAdminTags, saveAdminTags, deleteAdminTags, approveAdminTags };
