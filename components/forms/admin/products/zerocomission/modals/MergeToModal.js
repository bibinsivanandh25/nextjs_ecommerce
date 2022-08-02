import React from "react";
import { Typography } from "@mui/material";
import ModalComponent from "@/atoms/ModalComponent";

const MergeToModal = ({
  openMergeToModal = false,
  setOpenMergeToModal = () => {},
}) => {
  return (
    <>
      <ModalComponent
        open={openMergeToModal}
        showFooter={false}
        onCloseIconClick={() => {
          setOpenMergeToModal(false);
        }}
        ModalTitle="Merge"
        titleClassName="fw-bold fs-14 color-orange"
      >
        <Typography>This is merge to modal</Typography>
      </ModalComponent>
    </>
  );
};

export default MergeToModal;
