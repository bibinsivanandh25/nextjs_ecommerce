import serviceUtil from "services/utils";

const getTabledata = (status, id) => {
  return serviceUtil
    .get(
      `products/master-product-filter?status=${status}&pageNumber=0&pageSize=5&keyword=&supplierId=${id}&filterStatus=ALL`
    )
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};

export { getTabledata };
