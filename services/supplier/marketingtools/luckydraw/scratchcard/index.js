import serviceUtil from "services/utils";

const getCategorys = () => {
  return serviceUtil
    .get(`products/main-category/drop-down-list`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

export { getCategorys };
