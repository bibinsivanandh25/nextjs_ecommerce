import axios from "axios";

const getAllTableDatas = () => {
  return axios
    .get(
      `${process.env.DOMAIN}users/admin/supplier/supplier-status/0/5?status=INITIATED`
    )
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const supplierApprovedOrRejected = (payload) => {
  return axios
    .post(`${process.env.DOMAIN}users/admin/supplier-approval`, payload, {
      headers: { userId: "ADM01234" },
    })
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const inviteSupplier = (username) => {
  return axios
    .post(
      `${process.env.DOMAIN}users/admin/invite-supplier?userName=${username}`
    )
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

export { getAllTableDatas, supplierApprovedOrRejected, inviteSupplier };
