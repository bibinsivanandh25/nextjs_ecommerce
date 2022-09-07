import serviceUtil from "services/utils";

const getTableData = (filterStatus = "ALL", keyword = "", pageIndex = 0) => {
  return serviceUtil
    .get(
      `products/filter-master-product/${pageIndex}/10?status=APPROVED&filterStatus=${filterStatus}&keyword=${keyword}`
    )
    .then((res) => {
      const { data } = res;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};

export { getTableData };
