import ModalComponent from "@/atoms/ModalComponent";
import { useState, useEffect } from "react";
import { getSetDataById } from "services/admin/products/productCategories/sets";

const SetsViewModal = ({ viewModalopen, setViewModalOpen, selectedData }) => {
  const [viewData, setViewData] = useState({});
  const getViewModalData = async () => {
    const { data, err } = await getSetDataById(selectedData.categorySetId);
    if (data.data) {
      setViewData(data.data);
    }
    if (err) {
      setViewData({});
    }
  };
  useEffect(() => {
    getViewModalData();
  }, [selectedData]);
  return (
    <ModalComponent
      open={viewModalopen}
      ModalTitle="View Sets"
      ModalWidth={650}
      onCloseIconClick={() => {
        setViewModalOpen(false);
      }}
    >
      <p>efwe</p>
    </ModalComponent>
  );
};

export default SetsViewModal;
