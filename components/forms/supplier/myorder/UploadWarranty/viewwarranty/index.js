import { useEffect } from "react";
import { getView } from "services/supplier/orders/uploadwarranty";
import toastify from "services/utils/toastUtils";

const ViewWarent = ({ warrantyDetails = {} }) => {
  const getViewDetails = async () => {
    const { data, err } = await getView(warrantyDetails);
    if (data) {
      console.log({ data });
    } else {
      toastify(err?.response?.data?.message, "error");
    }
  };

  useEffect(() => {
    getViewDetails();
  }, [warrantyDetails]);
  return <div>uyhkjsdc</div>;
};

export default ViewWarent;
