import serviceUtil from "services/utils";

const changeSupplierPassword = (reqObj) => {
  return serviceUtil
    .put(`auth/user/change-password`, reqObj)
    .then((res) => {
      const data = res;
      return data;
    })
    .catch((err) => ({ err }));
};
export { changeSupplierPassword };
