import serviceUtil from "services/utils";

const getSupplierDetailsById = (id) => {
  return serviceUtil
    .get(`users/supplier-registration?id=${id}&status=APPROVED`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};
const getCurrentData = () => {
  return serviceUtil
    .get(`products/local-date-time`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};

export { getSupplierDetailsById, getCurrentData };
