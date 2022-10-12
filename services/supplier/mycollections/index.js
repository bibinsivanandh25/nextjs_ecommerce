import serviceUtil from "services/utils";

const getCollections = async (userId, pageNumber, searchText, filterStatus) => {
  const pageSize = 50;
  return serviceUtil
    .get(
      `products/master-product-filter?status=APPROVED&pageNumber=${pageNumber}&pageSize=${pageSize}&keyword=${searchText}&supplierId=${userId}&filterStatus=${filterStatus}`
    )
    .then((res) => {
      const { data } = res?.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const getAllProductFlags = async (supplierId) => {
  try {
    const { data } = await serviceUtil.get(
      `products/supplier-flag/SUPPLIER/${supplierId}`
    );
    if (data) {
      console.log(data.data);
      return data;
    }
  } catch (error) {
    return error;
  }
};

const getDataOfSingleFlagSelected = async (id, supplierId, purchaseId) => {
  try {
    const { data } = await serviceUtil.get(
      `products/supplier-flag/${id}/${purchaseId}/${supplierId}`
    );
    if (data) {
      console.log(data.data);
      return data;
    }
  } catch (error) {
    return error;
  }
};

const postAFlag = async (payload) => {
  try {
    const { data } = await serviceUtil.post("products/supplier-flag", payload);
    if (data) {
      return data;
    }
  } catch (error) {
    return error;
  }
};

export {
  getCollections,
  getAllProductFlags,
  getDataOfSingleFlagSelected,
  postAFlag,
};
