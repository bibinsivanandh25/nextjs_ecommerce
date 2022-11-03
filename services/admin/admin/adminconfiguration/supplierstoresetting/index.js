import serviceUtil from "services/utils";

const getAllSupplierStoreSettings = async (pageNumber) => {
  try {
    const { data } = await serviceUtil.get(
      `users/admin-configuration/${pageNumber}/50`
    );
    return data;
  } catch (error) {
    return { error };
  }
};

const addASetting = async (payload) => {
  try {
    const { data } = await serviceUtil.post(
      `users/admin-configuration`,
      payload
    );
    return data;
  } catch (error) {
    return { error };
  }
};

const updateASetting = async (payload) => {
  try {
    const { data } = await serviceUtil.put(
      `users/admin-configuration`,
      payload
    );
    return data;
  } catch (error) {
    return { error };
  }
};

export { getAllSupplierStoreSettings, addASetting, updateASetting };
