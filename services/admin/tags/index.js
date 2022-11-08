import serviceUtil from "services/utils";

const getAdminTags = (page, payload) => {
  return serviceUtil
    .post(`products/product-tags/${page}/50`, payload)
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
const approveAdminTags = (id, status) => {
  return serviceUtil
    .put(`products/product-tag/status/${id}/${status}`)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const updateAdminTag = (payload) => {
  return serviceUtil
    .put(`products/product-tag`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
const enableDisableTags = (id, status) => {
  return serviceUtil
    .put(`products/product-tag/tag-status?tagId=${id}&disable=${status}`)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};
export {
  getAdminTags,
  saveAdminTags,
  deleteAdminTags,
  approveAdminTags,
  updateAdminTag,
  enableDisableTags,
};
