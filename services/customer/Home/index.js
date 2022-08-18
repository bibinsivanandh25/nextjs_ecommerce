import axios from "axios";

const getBannersBySupplierId = (supplierId) => {
  return axios
    .get(
      `http://10.10.31.116:8765/api/v1/users/supplier/banners?supplierId=${supplierId}`
    )
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({
      err,
    }));
};

const getTopProducts = (userId) => {
  return axios
    .get(
      `http://10.10.31.116:8765/api/v1/products/master-product-filter?status=APPROVED&pageNumber=0&pageSize=100&keyword=&supplierId=${userId}&filterStatus=ALL`
    )
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getMainCategories = () => {
  return axios
    .get("http://10.10.31.116:8765/api/v1/products/main-category-enabled/0/5")
    .then((res) => {
      const data = res && res.data?.data;
      return { data };
    })

    .catch((err) => ({ err }));
};
export { getBannersBySupplierId, getMainCategories, getTopProducts };
