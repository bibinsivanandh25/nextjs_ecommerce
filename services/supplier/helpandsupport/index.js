import serviceUtil from "services/utils";

const helpandsupportFileUpload = (payload) => {
  return serviceUtil
    .put(`products/media/help-support`, payload, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const saveHelpandSupport = (payload) => {
  return serviceUtil
    .post(`help-and-support/ticket`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const getAllHelpandSupportData = (payload, page) => {
  return serviceUtil
    .post(`help-and-support/supplier/ticket/${page}/50`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const viewHelpandSupport = (payload) => {
  return serviceUtil
    .put(`help-and-support/ticket`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};
const replyHelpandSupport = (payload) => {
  return serviceUtil
    .put(`help-and-support/ticket-reply`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

export {
  helpandsupportFileUpload,
  saveHelpandSupport,
  getAllHelpandSupportData,
  viewHelpandSupport,
  replyHelpandSupport,
};
