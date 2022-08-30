import serviceUtil from "services/utils";

const getSupplierDetailsBySupplierId = (supplierId) => {
  return serviceUtil
    .get(`/users/supplier-registration?id=${supplierId}&status=APPROVED`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getMainCategories = () => {
  return serviceUtil
    .get(`products/main-category/drop-down-list`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const updateSupplierProfile = (payload) => {
  return serviceUtil
    .put(`/users/supplier-profile`, payload)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => ({ err }));
};

const UpdateProfilePicture = (payload) => {
  serviceUtil.put("products/supplier/supplier-profile", payload);
};
export {
  getSupplierDetailsBySupplierId,
  updateSupplierProfile,
  getMainCategories,
};
