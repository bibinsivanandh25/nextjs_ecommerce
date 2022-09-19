import serviceUtil from "services/utils";

const getCollections = async (userId) => {
  const { data, err } = await serviceUtil.get(
    `products/master-product-filter?status=APPROVED&pageNumber=0&pageSize=10&keyword=&supplierId=${userId}&filterStatus=ALL`
  );
  if (data) {
    return data.data;
  }
  if (err) {
    // console.log(err.response);
  }
  return null;
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
