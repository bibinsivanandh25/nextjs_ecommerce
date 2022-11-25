import serviceUtil from "services/utils";

const getCollections = async (userId, pageNumber, searchText, filterStatus) => {
  const pageSize = 50;
  return serviceUtil
    .get(
      `products/master-product/my-collection/${pageNumber}/${pageSize}?supplierId=${userId}&status=APPROVED&filterType=${filterStatus}&keyword=${searchText}`
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
      return data;
    }
  } catch (error) {
    return error;
  }
  return null;
};

const getDataOfSingleFlagSelected = async (id, supplierId, purchaseId) => {
  try {
    const { data } = await serviceUtil.get(
      `products/supplier-flag/${id}/${purchaseId}/${supplierId}`
    );
    if (data) {
      return data;
    }
  } catch (error) {
    return error;
  }
  return null;
};

export { getCollections, getAllProductFlags, getDataOfSingleFlagSelected };
