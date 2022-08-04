import { Typography } from "@mui/material";
import React from "react";
import ModalComponent from "@/atoms/ModalComponent";

const EditModalForArticles = ({ openEditModal, setOpenEditModal }) => {
  return (
    <div>
      <ModalComponent
        open={openEditModal}
        ModalTitle="Edit Article"
        titleClassName="fw-bold fs-14 color-orange"
        footerClassName="d-flex justify-content-start flex-row-reverse border-top mt-3"
        ClearBtnText="Draft"
        saveBtnText="Publish"
        saveBtnClassName="ms-1"
        ModalWidth={650}
        onCloseIconClick={() => {
          setOpenEditModal(false);
        }}
        onSaveBtnClick={() => {
          // handleSaveBtnClickOfEditModal();
        }}
        onClearBtnClick={() => {
          // handleClearAll();
        }}
      >
        <Typography>This is article edit modal</Typography>
      </ModalComponent>
    </div>
  );
};

export default EditModalForArticles;
