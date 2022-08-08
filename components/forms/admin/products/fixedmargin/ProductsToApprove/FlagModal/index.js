import { Typography } from "@mui/material";
import React from "react";
import ModalComponent from "@/atoms/ModalComponent";

const FlagModal = ({ showFlagModal = false, setShowFlagModal = () => {} }) => {
  return (
    <>
      <ModalComponent
        open={showFlagModal}
        onCloseIconClick={() => {
          setShowFlagModal(false);
        }}
        ModalTitle="Flags"
        titleClassName="fw-bold fs-14 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top"
        saveBtnText="Submit"
        ClearBtnText="Cancel"
        saveBtnClassName="ms-2"
        onClearBtnClick={() => {
          setShowFlagModal(false);
        }}
      >
        <Typography>This is flag modal</Typography>
      </ModalComponent>
    </>
  );
};

export default FlagModal;
