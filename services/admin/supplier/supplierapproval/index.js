import serviceUtil from "services/utils";

const getSuppliers = (page, payload) => {
  return serviceUtil
    .post(`users/admin/supplier/supplier-status/${page}/50`, payload)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};

const supplierApprovedOrRejected = (payload) => {
  return serviceUtil
    .post(`users/admin/supplier-approval`, payload, {
      headers: { userId: "ADM01234" },
    })
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const inviteSupplier = (username) => {
  return serviceUtil
    .post(`users/admin/invite-supplier?userName=${username}`)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getCategoryFilterData = () => {
  return serviceUtil
    .get(`products/categories?commissionType=ZERO_COMMISSION`)
    .then((res) => {
      const { data } = res && res;
      return { data };
    })
    .catch((err) => ({ err }));
};

export {
  getSuppliers,
  supplierApprovedOrRejected,
  inviteSupplier,
  getCategoryFilterData,
};
