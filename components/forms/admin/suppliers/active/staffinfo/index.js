import ModalComponent from "@/atoms/ModalComponent";
import React from "react";

const StaffInfo = ({
  staffInfo,
  showStaffModal,
  setShowStaffModal = () => {},
}) => {
  console.log(staffInfo);
  return (
    <ModalComponent
      open={showStaffModal}
      onCloseIconClick={() => setShowStaffModal(false)}
      showPositionedClose
      headerClassName=""
      ModalTitle=""
      showCloseIcon={false}
      headerBorder=""
      showFooter={false}
      minWidth={700}
    >
      <p>sc</p>
    </ModalComponent>
  );
};

export default StaffInfo;
