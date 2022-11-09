import serviceUtil from "services/utils";

const getFlags = (payLoad) => {
  return serviceUtil
    .put(`products/product-flags`, payLoad)
    .then((res) => {
      const { data, message } = res && res.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};
const changeStatus = (id, flag) => {
  return serviceUtil
    .put(`products/product-flag/${id}/${flag}`)
    .then((res) => {
      const { message } = res && res.data;
      return { data: res.data, message };
    })
    .catch((err) => ({ err }));
};
const deleteflags = (id) => {
  return serviceUtil
    .deleteById(`products/produt-flag/${id}`)
    .then((res) => {
      const { message } = res && res.data;
      return { data: res.data, message };
    })
    .catch((err) => ({ err }));
};

const getFlagTitle = () => {
  return serviceUtil
    .get(
      `products/product-flag/title`
    )
    .then((res) => { 
      const { data } = res && res;
      return { data };
      
    })
    .catch((err) => ({ err }));
};
const getTheme=()=>{
  return serviceUtil
  .get(
    `products/product-flag/layout`
  ).then((res)=>{
    const { data } = res && res;
    return { data };
  })
  .catch((err) => ({ err }));
}

const editThemeLayout = (payLoad) => {
  return serviceUtil
    .put(`products/product-flag/layout/theme`, payLoad)
    .then((res) => {
      const { data, message } = res && res.data;
      return { data, message };
    })
    .catch((err) => ({ err }));
};
export { getFlags, changeStatus, deleteflags, getFlagTitle, getTheme,editThemeLayout };
