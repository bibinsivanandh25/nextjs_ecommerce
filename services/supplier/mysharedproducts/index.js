import serviceUtil from "services/utils";

const getDropdown = (id) => {
  return serviceUtil
    .get(`products/myshared-product/dropdown?supplierId=${id}`)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};
const shareProductPost = (payload) => {
  return serviceUtil
    .post(`products/myshared-product/`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};
const getSharedProduct = (payload) => {
  return serviceUtil
    .post(`products/myshared-product/get-myshared-product`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};
export { getDropdown, shareProductPost, getSharedProduct };
