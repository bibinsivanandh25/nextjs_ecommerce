import serviceUtil from "services/utils";

const getAllTableDatas = () => {
  return serviceUtil
    .get(`users/admin/supplier/supplier-status/0/50?status=INITIATED`)
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

export { getAllTableDatas, supplierApprovedOrRejected, inviteSupplier };
