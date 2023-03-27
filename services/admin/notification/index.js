import serviceUtil from "services/utils";

const getSupplierDropdown = (payload) => {
  return serviceUtil
    .put(`notification/notification-dropdown`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
export { getSupplierDropdown };
