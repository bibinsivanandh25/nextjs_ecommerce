import serviceUtil from "services/utils";

const getStaff = (supplierId, page = 0, keyword = "", searchText = "NAME") => {
  const rows = 50;
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

const saveStaff = (payload) => {
  return serviceUtil
    .post(`users/staff-management`, payload)
    .then((res) => {
      const { data, message } = res.data;
      return { data, message };
    })
    .catch((err) => {
      return { err };
    });
};
const getStaffdetails = (staffId) => {
  return serviceUtil
    .get(`users/staff-management/${staffId}`)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return err;
    });
};
const deleteStaff = (staffId) => {
  return serviceUtil
    .deleteById(`users/staff-management/${staffId}`)
    .then((res) => {
      const { data, message } = res.data;
      return { data, message };
    })
    .catch((err) => {
      return err;
    });
};
const updateStaffs = (payload) => {
  return serviceUtil
    .put(`users/staff-management`, payload)
    .then((res) => {
      const { data, message } = res.data;
      return { data, message };
    })
    .catch((err) => {
      return { err };
    });
};

export { getStaff, saveStaff, getStaffdetails, deleteStaff, updateStaffs };
