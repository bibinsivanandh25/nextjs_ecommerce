import serviceUtil from "services/utils";

const getAdminBanners = (payload) => {
  return serviceUtil
    .put(`users/banner`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const adminSaveBanner = (payload) => {
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
const adminBannnerMedia = async (payload) => {
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
const adminDeleteBanner = (id) => {
  return serviceUtil
    .deleteAll(`users/banner/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return { err };
    });
};
const adminUpdateBanner = (payload) => {
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
const adminBannerDisable = (id, flag) => {
  return serviceUtil
    .put(`users/banner/${id}/${flag}`)
    .then((res) => {
      const { data } = res;
      return { data };
    })
    .catch((err) => {
      return { err };
    });
};
export {
  getAdminBanners,
  adminSaveBanner,
  adminBannnerMedia,
  adminDeleteBanner,
  adminUpdateBanner,
  adminBannerDisable,
};
