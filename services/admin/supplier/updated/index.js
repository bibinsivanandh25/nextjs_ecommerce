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

export { getAll };
