import ModalComponent from "@/atoms/ModalComponent";
import React from "react";

const SetFilterModal = ({ showFilterModal, setShowFilterModal }) => {
  return (
    <ModalComponent
      open={showFilterModal}
      onCloseIconClick={() => {
        setShowFilterModal(false);
      }}
    >
      <p>reg</p>
    </ModalComponent>
  );
};

export default SetFilterModal;
