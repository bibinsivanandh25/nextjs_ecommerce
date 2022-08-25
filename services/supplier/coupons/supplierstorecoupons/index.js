import serviceUtil from "services/utils";

const getAllStoreCouponsWithFilter = (
  pageNumber,
  pageSize,
  supplierId,
  keyword,
  type
) => {
  return serviceUtil
    .get(
      `/users/supplier/store-coupon/${pageNumber}/${pageSize}?supplierId=${supplierId}&keyword=${keyword}&type=${type}`
    )
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const CreateSupplierStoreCoupons = (payload) => {
  return serviceUtil
    .post(`/users/supplier/store-coupon`, payload)
    .then((res) => {
      const data = res && res;
      return data;
    })
    .catch((err) => ({ err }));
};

export { getAllStoreCouponsWithFilter, CreateSupplierStoreCoupons };
