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
export { getCollections };
