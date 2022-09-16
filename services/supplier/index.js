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
const getNavBarItems = () => {
  return serviceUtil
    .get(`products/supplier/side-navigation?userType=SUPPLIER`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};
const getmarketingToolStatus = (supplierId) => {
  return serviceUtil
    .get(`users/marketing-tool/tool-status?supplierId=${supplierId}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};

export {
  getSupplierDetailsById,
  getCurrentData,
  getNavBarItems,
  getmarketingToolStatus,
};
