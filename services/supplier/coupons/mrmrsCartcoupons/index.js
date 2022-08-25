import serviceUtil from "services/utils";

const getAllCouponsWithFilter = (
  pageNumber,
  pageSize,
  supplierId,
  keyword,
  type
) => {
  return serviceUtil
    .get(
      `/users/supplier/product-coupon/${pageNumber}/${pageSize}/?supplierId=${supplierId}&filterType=${type}&keyword=${keyword}`
    )
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getCategories = () => {
  return serviceUtil
    .get("products/main-category/drop-down-list")
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getSubCategoryBasedOnMainCategory = (categoryId) => {
  return serviceUtil
    .get(`products/sub-category/main-category/${categoryId}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getProductsBasedOnSubCategory = (supplierId, subCategoryId) => {
  return serviceUtil
    .get(
      `/products/master-product/products?supplierId=${supplierId}&subCategoryId=${subCategoryId}`
    )
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const CreateStoreCoupons = (payload) => {
  return serviceUtil
    .post(`/users/supplier/product-coupon`, payload)
    .then((res) => {
      const data = res && res;
      return data;
    })
    .catch((err) => ({ err }));
};
const publishCoupons = (supplierId, storeCoupon) => {
  return serviceUtil
    .put(
      `/users/supplier/product-coupon/publish?supplierId=${supplierId}&couponCode=${storeCoupon}`
    )
    .then((res) => {
      const data = res && res;
      return data;
    })
    .catch((err) => ({ err }));
};

export {
  getAllCouponsWithFilter,
  getCategories,
  getSubCategoryBasedOnMainCategory,
  getProductsBasedOnSubCategory,
  CreateStoreCoupons,
  publishCoupons,
};
