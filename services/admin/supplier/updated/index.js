import serviceUtil from "services/utils";

const getAll = async () => {
  try {
    const { data } = await serviceUtil.get(
      `notification/supplier-changes-history`
    );
    return data;
  } catch (error) {
    return { error };
  }
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
