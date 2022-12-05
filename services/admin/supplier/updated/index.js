import serviceUtil from "services/utils";

const getAll = (payload) => {
  return serviceUtil
    .post(`notification/supplier-changes-history-filter`, payload)
    .then((res) => {
      const { data } = res && res.data;
      return { data };
    })
    .catch((err) => ({ err }));
};

const accept = async (changeHistoryId) => {
  try {
    const { data } = await serviceUtil.put(
      `notification/supplier-changes-history-approved/${changeHistoryId}`
    );
    return data;
  } catch (error) {
    return { error };
  }
};

const reject = async (changeHistoryId) => {
  try {
    const { data } = await serviceUtil.put(
      `notification/supplier-changes-history/${changeHistoryId}`
    );
    return data;
  } catch (error) {
    return { error };
  }
};

export { getAll, accept, reject };
