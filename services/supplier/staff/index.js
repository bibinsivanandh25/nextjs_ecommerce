import serviceUtil from "services/utils";

const getStaff = (
  supplierId,
  page = 0,
  rows = 5,
  keyword = "",
  searchText = "NAME"
) => {
  return serviceUtil
    .get(
      `users/staff-management/filter/${page}/${rows}?supplierId=${supplierId}&type=${searchText}&keyword=${keyword}`
    )
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};

export { getStaff };
