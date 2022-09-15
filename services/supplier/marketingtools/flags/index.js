import serviceUtil from "services/utils";

const getAllFlags = (
  supplierId,
  supplierStoreId,
  pageNumber = 0,
  dateFrom = "",
  dateTo = ""
) => {
  const pageSize = 50;
  return serviceUtil
    .post(`products/supplier-flag/${pageNumber}/${pageSize}`, {
      dateFrom,
      dateTo,
      supplierStoreId,
      supplierId,
    })
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};

const updateFlag = (payload) => {
  return serviceUtil
    .put(`products/supplier-flag`, payload)
    .then((res) => {
      const data = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

export { getAllFlags, updateFlag };
