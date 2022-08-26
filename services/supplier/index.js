import axios from "axios";

const getSupplierDetailsById = (id) => {
  return axios
    .get(
      `${process.env.DOMAIN}users/supplier-registration?id=${id}&status=APPROVED`
    )
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};

export { getSupplierDetailsById };
