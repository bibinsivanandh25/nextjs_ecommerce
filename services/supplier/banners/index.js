import serviceUtil from "services/utils";

const getAllData = (payload) => {
  return serviceUtil
    .put(`users/banner`, payload)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};

const saveBanner = (payload) => {
  return serviceUtil
    .post(`users/banner`, payload)
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const bannnerMedia = async (payload) => {
  return serviceUtil
    .put(`products/supplier/banner-media`, payload, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
const deleteBanner = (id) => {
  return serviceUtil
    .deleteAll(`users/banner/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return { err };
    });
};
const updateBanner = (payload) => {
  return serviceUtil
    .put("users/supplier/banner", payload, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      const { data } = res.data;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};

export { getAllData, saveBanner, bannnerMedia, deleteBanner, updateBanner };
