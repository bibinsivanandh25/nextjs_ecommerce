import axios from "axios";
import { getSession } from "next-auth/react";
import serviceUtil from "services/utils";

const getAttributes = (subCategoryId) => {
  return serviceUtil
    .get(`products/sub-category/${subCategoryId}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};
const createAttributes = (payload) => {
  return serviceUtil
    .post(`products/variation/option/variation-approval`, payload)
    .then((res) => {
      const { data } = res;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};

const saveProduct = (payload) => {
  return serviceUtil
    .post(`products/master-product`, payload)
    .then((res) => {
      const { data } = res;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};

const saveMedia = async (payload) => {
  return axios
    .put(
      `http://10.10.31.116:8100/api/v1/products/product-media?supplierId=${await getSession().then(
        (res) => {
          return res.user.id;
        }
      )}`,
      payload,
      {
        header: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
const getSet = (payload) => {
  return serviceUtil
    .get(
      `products/category-set-enabled/drop-down-list?mainCategoryId=${payload}`
    )
    .then((res) => {
      const { data } = res;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};
const getSubCategory = (payload) => {
  return serviceUtil
    .get(`products/sub-category/drop-down-list?setId=${payload}`)
    .then((res) => {
      const { data } = res;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};

export {
  getSet,
  getSubCategory,
  getAttributes,
  createAttributes,
  saveProduct,
  saveMedia,
};
